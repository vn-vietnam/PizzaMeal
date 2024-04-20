import { Text, FlatList, ActivityIndicator } from "react-native";

import orders from "@/constants/data/orders";
import OrderListItem from "@/components/OrderListItem";
import { useAdminOrderList, useMyOrderList } from "@/api/orders";
import { useInsertOrderSubscription } from "@/api/orders/subcription";

export default function OrdersScreen() {
	const {
		data: orders,
		isLoading,
		error,
	} = useAdminOrderList({ archived: false });
  useInsertOrderSubscription();
	if (isLoading) {
		return <ActivityIndicator />;
	}
	if (error) {
		return <Text>Failed to fetch</Text>;
	}

	return (
		<FlatList
			data={orders}
			renderItem={({ item }) => <OrderListItem order={item} />}
			contentContainerStyle={{ gap: 10, padding: 10 }}
		/>
	);
}
