import Button from "@/components/Button";

import Colors from "@/constants/Colors";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import * as FileSystem from "expo-file-system";
import { randomUUID } from "expo-crypto";
import { supabase } from "@/lib/supabase";
import {
	useDeleteProduct,
	useInsertProduct,
	useProduct,
	useUpdateProduct,
} from "@/api/product";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { decode } from "base64-arraybuffer";
import Loading from "@/components/Container/Loading";
import RemoteImage from "@/components/RemoteImage";

export const defaultPizzaImage =
	"https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

const CreateProductScreen = () => {
	const [name, setName] = useState<string>("");
	const [price, setPrice] = useState<string>("");
	const [errors, setErrors] = useState<string>("");
	const [image, setImage] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const { id: idString } = useLocalSearchParams();
	const id = parseFloat(
		typeof idString === "string" ? idString : idString?.[0]
	);
	const isUpdating = !!idString;
	const { mutate: insertProduct } = useInsertProduct();
	const { mutate: updateProduct } = useUpdateProduct();
	const { data: updatingProduct } = useProduct(id);
	const { mutate: deleteProduct } = useDeleteProduct();

	const router = useRouter();

	useEffect(() => {
		if (updatingProduct) {
			setName(updatingProduct.name);
			setPrice(updatingProduct.price.toString());
			setImage(updatingProduct.image);
		}
	}, [updatingProduct]);

	const resetFields = () => {
		setName("");
		setPrice("");
	};

	const validateInput = () => {
		setErrors("");
		if (!name) {
			setErrors("Name is required");
			return false;
		}
		if (!price) {
			setErrors("Price is required");
			return false;
		}
		if (isNaN(parseFloat(price))) {
			setErrors("Price is not a number");
			return false;
		}
		return true;
	};

	const onSubmit = () => {
		if (isUpdating) {
			// update
			onUpdate();
		} else {
			onCreate();
		}
	};
	const onCreate = async () => {
		setLoading(true);
		if (!validateInput()) {
			return;
		}
		const imagePath = await uploadImage();
		// Save in the database
		insertProduct(
			{ name, price: parseFloat(price), image: imagePath },
			{
				onSuccess: () => {
					setLoading(false);
					resetFields();
					router.back();
				},
			}
		);
	};

	const onUpdate = async () => {
		setLoading(true);
		if (!validateInput()) {
			return;
		}

		const imagePath = await uploadImage();
		// console.log(imagePath)
		updateProduct(
			{ id, name, price: parseFloat(price), image: imagePath },
			{
				onSuccess: () => {
					setLoading(false);
					resetFields();
					router.back();
				},
			}
		);
	};

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.canceled) {
			// console.log(result.assets[0].uri)
			setImage(result.assets[0].uri);
		}
	};
	const onDelete = () => {
		setLoading(true);
		deleteProduct(id, {
			onSuccess: () => {
				setLoading(false);
				resetFields();
				router.replace("/(admin)");
			},
		});
	};
	// console.log(image);
	const confirmDelete = () => {
		Alert.alert("Confirm", "Are you sure you want to delete this product", [
			{
				text: "Cancel",
			},
			{
				text: "Delete",
				style: "destructive",
				onPress: onDelete,
			},
		]);
	};

	const uploadImage = async () => {
		if (!image?.startsWith("file://")) {
			return;
		}
		const base64 = await FileSystem.readAsStringAsync(image, {
			encoding: "base64",
		});
		const filePath = `${randomUUID()}.png`;
		const contentType = "image/png";
		const { data, error } = await supabase.storage
			.from("product_image")
			.upload(filePath, decode(base64), { contentType });
		console.log(error);
		if (data) {
			return data.path;
		}
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{ title: isUpdating ? "Update Product" : "Create Product" }}
			/>
			<RemoteImage
				path={image}
				fallback={defaultPizzaImage}
				resizeMode="cover"
				style={styles.image}
			/>
			<Text onPress={pickImage} style={styles.textButton}>
				Select Image
			</Text>

			<Text style={styles.label}>Name</Text>
			<TextInput
				value={name}
				onChangeText={setName}
				placeholder="Name"
				style={styles.input}
			/>

			<Text style={styles.label}>Price ($)</Text>
			<TextInput
				value={price}
				onChangeText={setPrice}
				placeholder="9.99"
				style={styles.input}
				keyboardType="numeric"
			/>

			<Text style={{ color: "red" }}>{errors}</Text>
			<Button onPress={onSubmit} text={isUpdating ? "Update" : "Create"} />
			{isUpdating && (
				<Button
					text="Delete"
					onPress={confirmDelete}
					style={styles.textButton}
				/>
			)}
		</View>
	);
};

export default CreateProductScreen;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 10,
	},
	image: {
		width: "50%",
		aspectRatio: 1,
		alignSelf: "center",
	},
	textButton: {
		alignSelf: "center",
		fontWeight: "bold",
		color: Colors.light.tint,
		marginVertical: 10,
	},

	input: {
		backgroundColor: "white",
		padding: 10,
		borderRadius: 5,
		marginTop: 5,
		marginBottom: 20,
	},
	label: {
		color: "gray",
		fontSize: 16,
	},
});