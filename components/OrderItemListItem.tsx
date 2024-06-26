import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

import { Tables } from "@/type/types";
import RemoteImage from "./RemoteImage";
// import RemoteImage from './RemoteImage';

// type OrderItemListItemProps = {
// 	item: { products: Tables<"products"> } & Tables<"order_items">;
// };

export const defaultPizzaImage =
	"https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";
const OrderItemListItem = ({ item }: any) => {
	console.log(item)
	return (
		<View style={styles.container}>
			<RemoteImage
				path={item.products.image}
				fallback={defaultPizzaImage}
				style={styles.image}
				resizeMode="contain"
			/>
			{/* <Image
				src={(item?.image as string) || defaultPizzaImage}
				style={styles.image}
			/> */}
			<View style={{ flex: 1 }}>
				<Text style={styles.title}>{item.products.name}</Text>
				<View style={styles.subtitleContainer}>
					<Text style={styles.price}>${item.products.price.toFixed(2)}</Text>
					{item.products.cate_id === 1 ? (
						<>
							<Text>Size: {item?.size}</Text>
						</>
					) : (
						<></>
					)}
				</View>
			</View>
			<View style={styles.quantitySelector}>
				<Text style={styles.quantity}>Quantity: {item.quantity}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		borderRadius: 10,
		padding: 5,
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	image: {
		width: 75,
		aspectRatio: 1,
		alignSelf: "center",
		marginRight: 10,
	},
	title: {
		fontWeight: "500",
		fontSize: 16,
		marginBottom: 5,
	},
	subtitleContainer: {
		flexDirection: "row",
		gap: 5,
	},
	quantitySelector: {
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
		marginVertical: 10,
	},
	quantity: {
		fontWeight: "500",
		fontSize: 14,
	},
	price: {
		color: Colors.light.tint,
		fontWeight: "bold",
	},
});

export default OrderItemListItem;
