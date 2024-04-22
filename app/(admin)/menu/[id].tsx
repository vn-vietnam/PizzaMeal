import { useProduct } from "@/api/product";
import Button from "@/components/Button";
import RemoteImage from "@/components/RemoteImage";
import Colors from "@/constants/Colors";
import products from "@/constants/data/products";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/type/types";
import { FontAwesome } from "@expo/vector-icons";
import {
	Link,
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

	const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
	const { data: product, error, isLoading } = useProduct(id);

	const { addItem } = useCart();
	const router = useRouter();

	const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

	const addToCart = () => {
		if (!product) {
			return;
		}
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
			<Stack.Screen
				options={{
					title: product?.name,
					headerRight: () => (
						<Link href={`/(admin)/menu/create?id=${id}`} asChild>
							<Pressable>
								{({ pressed }) => (
									<FontAwesome
										name="pencil"
										size={25}
										color={Colors.light.tint}
										style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
									/>
								)}
							</Pressable>
						</Link>
					),
				}}
			/>
			<View style={{ alignItems: "center", marginVertical: 40 }}>
				<RemoteImage
					path={product?.image}
					fallback={defaultPizzaImage}
					resizeMode="cover"
					style={styles.image}
				/>
			</View>

			<Text>Select size</Text>
			<View style={styles.sizes}>
				{sizes.map((size) => (
					<Pressable
						onPress={() => {
							setSelectedSize(size);
						}}
						style={[
							styles.size,
							{
								backgroundColor: selectedSize === size ? "gainsboro" : "white",
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
			<View style={{ marginVertical: 20 }}>
				<Text>{product?.description}</Text>
			</View>
			<Text style={styles.price}>${product?.price}</Text>
			<Button text="Add to cart"  />
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
		width: "50%",
		aspectRatio: 1,
		borderRadius: 100,
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
