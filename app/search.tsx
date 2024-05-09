import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	Image,
	FlatList,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFilterProductList, useProductList, useSearchProduct } from "@/api/product";
import ProductListItem from "@/components/ProductListItem";
import SearchListItem from "@/components/SearchListItem";
export const defaultPizzaImage =
	"https://images.unsplash.com/photo-1701996614638-bba6faf962b0?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const Search = () => {
	const { top } = useSafeAreaInsets();
	const [text, setText] = useState("");
	const router = useRouter();
	const { data: products, error, isLoading }: any = useSearchProduct(text);
	return (
		<View
			style={{ paddingTop: top, backgroundColor: "rgba(0,0,0,0.05)", flex: 1 }}
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
				<TouchableOpacity
					onPress={() => router.back()}
					style={{
						width: 40,
						height: 40,
						borderRadius: 20,

						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<View style={styles.circle}>
						<MaterialCommunityIcons name={"keyboard-backspace"} size={20} />
					</View>
				</TouchableOpacity>

				<View style={styles.searchSection}>
					<Ionicons style={styles.searchIcon} name="search" size={20} />
					<TextInput
						style={styles.input}
						placeholder="Pizza, Drink, Snack..."
						onChangeText={(newText) => setText(newText)}
					/>
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
							<Ionicons name={"bag-handle-outline"} size={20} />
						</View>
					</TouchableOpacity>
				</Link>
				{/* <Link href={"/(user)/map"} asChild>
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
							<Ionicons name={"map-outline"} size={20} />
						</View>
					</TouchableOpacity>
				</Link> */}
			</View>
			<View
				style={{
					padding: 10,
					paddingBottom: 50
				}}
			>
				<Text style={{ fontWeight: "bold", color: "red" }}>
					Trending Search
				</Text>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "flex-start",
						paddingVertical: 10,
					}}
				>
					<View style={{ gap: 10, display: "flex", flexDirection: "row" }}>
						<Text style={{}}>Pizza</Text>
						<Text>Drink</Text>
						<Text>Fruits</Text>
						<Text>Combo</Text>
						<Text>Seafood</Text>
						<Text>Chicken</Text>
					</View>
				</View>
				<View>
					<FlatList
						data={products}
						renderItem={({ item }) => <SearchListItem product={item} />}
						numColumns={2}
						contentContainerStyle={{ gap: 10, padding: 10, paddingBottom: 150 }}
						columnWrapperStyle={{ gap: 10 }}
					/>
				</View>
			</View>
		</View>
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
	image: {
		width: 100,
		height: 100,
	},
});
export default Search;
