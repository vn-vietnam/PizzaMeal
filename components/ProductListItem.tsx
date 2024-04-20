import {
	View,
	Text,
	StyleSheet,
	Pressable,
	Image,
	ActivityIndicator,
} from "react-native";
import React from "react";
import {  Tables } from "@/type/types";
import { Link, useSegments } from "expo-router";
import Colors from "@/constants/Colors";
import Loading from "./Container/Loading";
import RemoteImage from "./RemoteImage";

export const defaultPizzaImage =
	"https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";
type ProductListItemProps = {
	product: Tables<'products'>;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
	const segments = useSegments();
	const segment = segments[0] || '';
	// console.log(product)
	return (
		<Link href={`/${segment}/menu/${product.id}` as `${string}:${string}`} asChild>
			<Pressable style={styles.container}>
				<RemoteImage
					path={product.image}
					fallback={defaultPizzaImage}
					resizeMode="cover"
					style={styles.image}
					/>

				<Text style={styles.title}>{product.name}</Text>
				<Text style={styles.price}>${product.price}</Text>
			</Pressable>
		</Link>
	);
};
const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		padding: 10,
		borderRadius: 20,
		flex: 1,
		maxWidth: "50%",
	},

	image: {
		width: "100%",
		aspectRatio: 1,
		borderRadius: 100
	},

	title: {
		fontSize: 18,
		fontWeight: "600",
		marginVertical: 10,
	},
	price: {
		color: Colors.light.tint,
		fontWeight: "bold",
	},
});
export default ProductListItem;
