import { useProduct } from "@/api/product";
import Button from "@/components/Button";
import RemoteImage from "@/components/RemoteImage";
import products from "@/constants/data/products";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/type/types";
import {
	Stack,
	useLocalSearchParams,
	usePathname,
	useRouter,
} from "expo-router";
import { useState } from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	Pressable,
	ActivityIndicator,
	ScrollView,
} from "react-native";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];
export const defaultPizzaImage =
	"https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";
const ProductDetailsScreen = () => {
	const { id: idString } = useLocalSearchParams();
	if(!idString){
		return <ActivityIndicator />;
	}
	const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
	const { data: product, error, isLoading } = useProduct(id);
	const { addItem } = useCart();

	const router = useRouter();

	const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

	const addToCart = () => {
		if (!product) {
			return;
		}
		// console.log(product,selectedSize)
		addItem(product, selectedSize);
		router.push("/cart");
	};

	if (isLoading) {
		return <ActivityIndicator />;
	}

	if (error) {
		return <Text>Failed to fetch products</Text>;
	}

	return (
		<ScrollView style={styles.container}>
			<Stack.Screen options={{ title: product?.name }} />

			<View style={{ alignItems: "center" }}>
				<RemoteImage
					path={product?.image}
					fallback={defaultPizzaImage}
					resizeMode="cover"
					style={styles.image}
				/>
			</View>
			<Text
				style={{
					marginVertical: 10,
					fontWeight: "bold",
				}}
			>
				Category: {product?.categories?.name}
			</Text>
			{product?.categories?.name === "Pizza" ? (
				<>
					<Text style={{ fontWeight: "bold" }}>Select size</Text>
					<View style={styles.sizes}>
						{sizes.map((size) => (
							<Pressable
								onPress={() => {
									setSelectedSize(size);
								}}
								style={[
									styles.size,
									{
										backgroundColor:
											selectedSize === size ? "gainsboro" : "white",
									},
								]}
								key={size}
							>
								<Text
									style={[
										styles.sizeText,
										{
											color: selectedSize === size ? "black" : "gray",
										},
									]}
								>
									{size}
								</Text>
							</Pressable>
						))}
					</View>
				</>
			) : (
				<></>
			)}

			<View style={{ marginVertical: 20 }}>
				<Text>{product?.description}</Text>
			</View>
			<Text style={styles.price}>${product?.price}</Text>
			<Button text="Add to cart" onPress={addToCart} />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		flex: 1,
		padding: 10,
	},
	image: {
		width: "100%",
		height: 200,
		// aspectRatio: 1,
		borderRadius: 10,
	},
	price: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: "auto",
		marginVertical: 30,
	},

	sizes: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginVertical: 10,
	},
	size: {
		backgroundColor: "gainsboro",
		width: 50,
		aspectRatio: 1,
		borderRadius: 25,
		alignItems: "center",
		justifyContent: "center",
	},
	sizeText: {
		fontSize: 20,
		fontWeight: "500",
	},
});

export default ProductDetailsScreen;
