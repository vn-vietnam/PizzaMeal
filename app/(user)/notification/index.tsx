import { Text, FlatList, ActivityIndicator } from "react-native";
import OrderListItem from "@/components/OrderListItem";
import { useMyOrderList } from "@/api/orders";
import { useUpdateAllOrderSubcription } from "@/api/orders/subcription";
import Empty from "@/components/Container/Empty";
import { news } from "@/constants/data/news";
import Nofi from "@/components/Nofi";

export default function OrdersScreen() {
	return (
		<FlatList
			data={news}
			renderItem={({ item }) => <Nofi note={item} />}
			contentContainerStyle={{ gap: 10, padding: 10 }}
		/>
	);
}
