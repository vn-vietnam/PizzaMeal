import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { Link, useSegments } from "expo-router";
import { Order, Tables } from "@/type/types";
import { color } from "react-native-elements/dist/helpers";

dayjs.extend(relativeTime);

type OrderListItemProps = {
	order: any;
};
const statusColor: any = {
	New: "red",
	Cooking: "#f1c40f",
	Delivering: "orange",
	Delivered: "green",
};

const OrderListItem = ({ order }: OrderListItemProps) => {
	const segments = useSegments();
	const segment = segments[0] || "";
	const getStatusColor = (status: string) => {
		return statusColor[status] || "black"; // Default color if status is not found
	};
	return (
		<Link
			href={`/${segment}/orders/${order.id}` as `${string}:${string}`}
			asChild
		>
			<Pressable style={styles.container}>
				<View>
					<Text style={styles.title}>Order #{order.id}</Text>
					<Text style={styles.time}>{dayjs(order.created_at).fromNow()}</Text>
				</View>

				<Text
					style={{ color: getStatusColor(order.status), fontWeight: "bold" }}
				>
					{order.status}
				</Text>
			</Pressable>
		</Link>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		padding: 10,
		borderRadius: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		fontWeight: "bold",
		marginVertical: 5,
	},
	time: {
		color: "gray",
	},
	status: {
		fontWeight: "500",
	},
});

export default OrderListItem;
