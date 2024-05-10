import { news } from "@/constants/data/news";
import { Stack } from "expo-router";
import { Image, Text, View, useWindowDimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import RenderHtml from "react-native-render-html";

export default function ItemNotification() {
	const { width } = useWindowDimensions();
	return (
		<ScrollView style={{ padding: 10, gap: 20, flex: 1 }}>
			<Stack.Screen options={{ title: news[0].title }} />
			<Image
				style={{ width: "100%", height: 200, borderRadius: 10 }}
				resizeMode="cover"
				source={{
					uri: news[0].img,
				}}
			/>
			<View style={{ flex: 1, gap: 10, paddingVertical: 10 }}>
				<Text>Author: {news[0].author}</Text>
				<Text>Time: {news[0].timeRead} mins</Text>
				<View>
					<RenderHtml contentWidth={width} source={news[0].data} />
				</View>
			</View>
		</ScrollView>
	);
}
