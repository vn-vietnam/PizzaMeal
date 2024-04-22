import { View, StyleSheet, Button } from "react-native";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";

const Cart = () => {
	const animation = useRef(null);

	return (
		<View style={styles.animationContainer}>
			<LottieView
				autoPlay
				ref={animation}
				style={{
					width: "80%",
					height: "50%",
					// backgroundColor: "#eee",
				}}
				// Find more Lottie files at https://lottiefiles.com/featured
				source={require("@/assets/animations/cart.json")}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	animationContainer: {
		// backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	buttonContainer: {
		paddingTop: 20,
	},
});
export default Cart;
