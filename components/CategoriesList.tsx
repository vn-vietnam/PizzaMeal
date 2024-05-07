import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	Image,
	Pressable,
	TouchableOpacity,
} from "react-native";
import React from "react";

export const defaultPizzaImage =
	"https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";
const CategoriesList = ({ categories, cate, setCate }: any) => {
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{
				paddingHorizontal: 10,
				paddingVertical: 5,
			}}
		>
			<TouchableOpacity style={styles.categoryCard} onPress={() => setCate("")}>
				<Image
					source={require("@/assets/images/icon.png")}
					style={styles.image}
					resizeMode="cover"
				/>
				<Text
					style={{
						color: cate === "" ? "red" : "black",
						borderBottomColor: cate === "" ? "red" : "black",
						...styles.categoryText,
					}}
				>
					All
				</Text>
			</TouchableOpacity>
			{categories?.map((area: any, id: any) => (
				<TouchableOpacity
					style={styles.categoryCard}
					key={id}
					onPress={() => setCate(area.id)}
				>
					<Image
						source={{ uri: area.img || defaultPizzaImage }}
						style={styles.image}
						resizeMode="cover"
					/>
					<Text
						style={{
							color: cate === area.id ? "red" : "black",
							borderBottomColor: cate === area.id ? "red" : "black",
							...styles.categoryText,
						}}
					>
						{area.name}
					</Text>
				</TouchableOpacity>
			))}
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	categoryCard: {
		width: 100,
		height: 130,
		marginEnd: 10,
		borderRadius: 5,
		paddingBottom: 15,
	},
	image: {
		flex: 1,
		width: 100,
		height: 100,
		borderRadius: 5,
	},
	categoryText: {
		textTransform: "capitalize",
		textAlign: "center",
		fontWeight: "bold",
		borderBottomWidth: 2,
	},
});

export default CategoriesList;
