import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React from "react";

import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { Link, useSegments } from "expo-router";
import { Order, Tables } from "@/type/types";
import { color } from "react-native-elements/dist/helpers";

dayjs.extend(relativeTime);

const statusColor: any = {
	New: "red",
	Cooking: "#f1c40f",
	Delivering: "orange",
	Delivered: "green",
};

const Nofi = ({ note }: any) => {
	const getStatusColor = (status: string) => {
		return statusColor[status] || "black"; // Default color if status is not found
	};
	return (
		<Link href={`/notification/${note.id}` as `${string}:${string}`} asChild>
			<Pressable style={styles.container}>
				<View>
					<Text style={styles.title}>{note.title}</Text>
					<Text style={styles.time}>{note.author} </Text>
					<Text style={styles.time}>{note.timeRead} mins </Text>
				</View>

				<Image source={{ uri: note.img }} width={100} height={100} style={{borderRadius: 4}} />
			
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
		alignItems: "flex-start",
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

export default Nofi;
