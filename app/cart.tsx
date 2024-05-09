import { View, Text, Platform, FlatList, ToastAndroid } from "react-native";
import { StatusBar } from "expo-status-bar";

import { useCart } from "@/providers/CartProvider";
import CartListItem from "@/components/CartListItem";
import Button from "@/components/Button";
import Cart from "@/components/Container/Cart";
import { useAuth } from "@/providers/AuthProvider";

const CartScreen = () => {
	const { items, total, checkout } = useCart();
	const { session, profile, setProfile }: any = useAuth();
	// console.log(profile);

	// console.log(items)
	if (items?.length === 0) {
		return <Cart />;
	}
	const checkFinish = () => {
		if (!profile.email || !profile.phone || !profile.address) {
			ToastAndroid.show("Please update profile", ToastAndroid.BOTTOM);
		} else {
			if (total === 0) {
				// console.log("please select pizza!");
				ToastAndroid.show("Please select pizza!", ToastAndroid.BOTTOM);
			} else {
				ToastAndroid.show("Successfully!", ToastAndroid.BOTTOM);
				checkout();
			}
		}
	};
	return (
		<View style={{ padding: 10 }}>
			<FlatList
				data={items}
				renderItem={({ item }) => <CartListItem cartItem={item} />}
				contentContainerStyle={{ gap: 10 }}
			/>

			<Text style={{ marginTop: 20, fontSize: 20, fontWeight: "500" }}>
				Total: ${total.toFixed(2)}
			</Text>
			<Button text="Checkout" onPress={checkFinish} />

			<StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
		</View>
	);
};

export default CartScreen;
