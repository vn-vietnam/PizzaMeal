import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

import { FontAwesome } from "@expo/vector-icons";
import { useCart } from "../providers/CartProvider";
import { CartItem } from "@/type/types";
import { SafeAreaView } from "react-native-safe-area-context";
import RemoteImage from "./RemoteImage";

export const defaultPizzaImage =
	"https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";
type CartListItemProps = {
	cartItem: CartItem;
};

const CartListItem = ({ cartItem }: any) => {
	const { updateQuantity } = useCart();

	return (
		<SafeAreaView style={styles.container}>
			<RemoteImage
				path={cartItem.product.image}
				fallback={defaultPizzaImage}
				style={styles.image}
				resizeMode="contain"
			/>
			<View style={{ flex: 1 }}>
				<Text style={styles.title}>{cartItem.product.name}</Text>
				<View style={styles.subtitleContainer}>
					<Text style={styles.price}>${cartItem.product.price.toFixed(2)}</Text>
					{cartItem?.product?.categories?.name === "Pizza" ? (
						<>
							<Text>Size: {cartItem.size}</Text>
						</>
					) : (
						<></>
					)}
				</View>
			</View>
			<View style={styles.quantitySelector}>
				<FontAwesome
					onPress={() => updateQuantity(cartItem.id, -1)}
					name="minus"
					color="gray"
					style={{ padding: 5 }}
				/>

				<Text style={styles.quantity}>{cartItem.quantity}</Text>
				<FontAwesome
					onPress={() => updateQuantity(cartItem.id, 1)}
					name="plus"
					color="gray"
					style={{ padding: 5 }}
				/>
			</View>
		</SafeAreaView>
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
		fontSize: 18,
	},
	price: {
		color: Colors.light.tint,
		fontWeight: "bold",
	},
});

export default CartListItem;
