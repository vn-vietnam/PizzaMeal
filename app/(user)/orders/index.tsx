import { Text, FlatList, ActivityIndicator } from "react-native";
import OrderListItem from "@/components/OrderListItem";
import { useMyOrderList } from "@/api/orders";
import { useUpdateAllOrderSubcription } from "@/api/orders/subcription";
import Empty from "@/components/Container/Empty";

export default function OrdersScreen() {
	const { data: orders, isLoading, error } = useMyOrderList();
	useUpdateAllOrderSubcription();

	if (error) {
		return <Text>Failed to fetch</Text>;
	}
	if (isLoading) {
		return <ActivityIndicator />;
	}
	// console.log(orders);
	if (orders?.length === 0) {
		return <Empty />;
	}
	return (
		<FlatList
			data={orders}
			renderItem={({ item }) => <OrderListItem order={item} />}
			contentContainerStyle={{ gap: 10, padding: 10 }}
		/>
	);
}
