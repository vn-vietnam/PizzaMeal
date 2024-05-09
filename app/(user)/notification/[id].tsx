// import { useOrderDetails } from '@/api/orders';
import { useOrderDetails } from "@/api/orders";
import { useUpdateOrderSubscription } from "@/api/orders/subcription";
import OrderItemListItem from "@/components/OrderItemListItem";
import OrderListItem from "@/components/OrderListItem";
import { news } from "@/constants/data/news";

import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function ItemNotification() {
	return (
		<ScrollView style={{ padding: 10, gap: 20, flex: 1 }}>
			<Stack.Screen options={{ title: news[0].title }} />
			<Image
				style={{ width: "100%", height: 200 }}
				resizeMode="cover"
				source={{
					uri: "https://images.pexels.com/photos/23124396/pexels-photo-23124396/free-photo-of-sunset-at-the-beach.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
				}}
			/>
			<View style={{ flex: 1, gap: 10 , paddingVertical: 10}}>
				<Text>Author: {news[0].author}</Text>
				<Text>Time: {news[0].timeRead} mins</Text>
				<Text>{news[0].data}</Text>
			</View>
		</ScrollView>
	);
}
