import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useCart } from "@/providers/CartProvider";
const Header = () => {
	const { top } = useSafeAreaInsets();
	const router = useRouter();
	const { items, total, checkout } = useCart();
	// console.log(items);

	// console.log(text);
	return (
		<BlurView
			intensity={120}
			tint={"extraLight"}
			style={{ paddingTop: top, backgroundColor: "rgba(0,0,0,0.05)" }}
		>
			<View
				style={[
					styles.container,
					{
						height: 60,
						gap: 10,
						paddingHorizontal: 20,
						backgroundColor: "transparent",
					},
				]}
			>
				<Link href={"/(user)/profile"} asChild>
					<TouchableOpacity
						style={{
							width: 40,
							height: 40,
							borderRadius: 20,

							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<View style={styles.circle}>
							<MaterialCommunityIcons name={"account-outline"} size={20} />
						</View>
					</TouchableOpacity>
				</Link>
				<View style={styles.searchSection}>
					<Ionicons style={styles.searchIcon} name="search" size={20} />
					<TouchableOpacity
						style={styles.input}
						onPress={() => router.push("/search")}
					>
						<Text>Search</Text>
					</TouchableOpacity>
				</View>
				<Link href={"/cart"} asChild>
					<TouchableOpacity
						style={{
							width: 40,
							height: 40,
							borderRadius: 20,

							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<View style={styles.circle}>
							{items ? (
								<Text
									style={{
										position: "absolute",
										top: -5,
										right: -7,
										backgroundColor: "red",
										padding: 4,
										borderRadius: 100,
										width: 20,
										height: 20,
										textAlign: 'center',
										color: "white",
										fontSize: 10
									}}
								>
									{items.length}
								</Text>
							) : (
								<></>
							)}
							<Ionicons name={"bag-handle-outline"} size={20} />
						</View>
					</TouchableOpacity>
				</Link>
			</View>
		</BlurView>
	);
};
const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	searchSection: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderColor: "gray",
		borderWidth: 1,
		backgroundColor: "",
		borderRadius: 30,
	},
	searchIcon: {
		padding: 10,
	},
	input: {
		flex: 1,
		paddingTop: 10,
		paddingRight: 10,
		paddingBottom: 10,
		paddingLeft: 0,
		borderRadius: 30,
	},
	circle: {
		width: 40,
		height: 40,
		borderRadius: 30,
		borderWidth: 1,
		justifyContent: "center",
		alignItems: "center",
		borderColor: "gray",
	},
});
export default Header;
