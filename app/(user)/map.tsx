import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import MapScreen from "@/components/Map";
import { hotels } from "@/constants/data/hotel";
import { withDecay } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

const Test = () => {
	// hooks
	const sheetRef = useRef<BottomSheet>(null);

	// variables

	const snapPoints = useMemo(() => ["4%", "50%"], []);

	// callbacks
	const handleSheetChange = useCallback((index: any) => {
		// console.log("handleSheetChange", index);
	}, []);
	const handleSnapPress = useCallback((index: any) => {
		console.log(index);
		sheetRef.current?.snapToIndex(index);
	}, []);
	const handleClosePress = useCallback(() => {
		sheetRef.current?.close();
	}, []);

	// render
	const renderItem = useCallback(
		(item: any, id: any) => (
			<View key={id} style={styles.itemContainer}>
				<View style={{ width: "70%", padding: 6 }}>
					<Text style={{ fontWeight: "bold" }}>{item.name}</Text>
					<Text style={{}}>
						<Ionicons name="time-outline" /> {item.time}
					</Text>
					<Text style={{}}>
						<Ionicons name="map-outline" /> {item.location}
					</Text>
					<Text>
						<Ionicons name="information-circle-outline" />
						 {item.des}
					</Text>
				</View>
				<Image
					source={{ uri: item.image }}
					style={{
						width: "30%",
						height: 150,
						borderBottomRightRadius: 10,
						borderTopRightRadius: 10,
					}}
				/>
			</View>
		),
		[]
	);
	return (
		<View style={styles.container}>
			<MapScreen />
			<BottomSheet
				ref={sheetRef}
				index={1}
				snapPoints={snapPoints}
				onChange={handleSheetChange}
				style={{ shadowColor: "#000", elevation: 10 }}
				enablePanDownToClose={false}
			>
				<BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
					{hotels.map(renderItem)}
				</BottomSheetScrollView>
			</BottomSheet>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
		backgroundColor: "white",
	},
	itemContainer: {

		margin: 6,
		borderRadius: 10,
		backgroundColor: "#eee",
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
	},
});

export default Test;
