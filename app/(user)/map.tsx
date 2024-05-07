import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

const Test = () => {
	// hooks
	const sheetRef = useRef<BottomSheet>(null);

	// variables
	const data = useMemo(
		() =>
			Array(50)
				.fill(0)
				.map((_, index) => `index-${index}`),
		[]
	);
	const snapPoints = useMemo(() => ["4%", "50%"], []);

	// callbacks
	const handleSheetChange = useCallback((index: any) => {
		console.log("handleSheetChange", index);
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
		(item: any) => (
			<View key={item} style={styles.itemContainer}>
				<Text>{item}</Text>
			</View>
		),
		[]
	);
	return (
		<View style={styles.container}>
			{/* <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />
			<Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
			<Button title="Snap To 25%" onPress={() => handleSnapPress(0)} />
			<Button title="Snap To 25%" onPress={() => handleSnapPress(-1)} />
			<Button title="Close" onPress={() => handleClosePress()} /> */}

			<BottomSheet
				ref={sheetRef}
				index={1}
				snapPoints={snapPoints}
				onChange={handleSheetChange}
				style={{ shadowColor: "#000", elevation: 10 }}
				enablePanDownToClose={false}
			>
				<BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
					{data.map(renderItem)}
				</BottomSheetScrollView>
			</BottomSheet>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 200,
		backgroundColor: "red"
	},
	contentContainer: {
		backgroundColor: "white",
	},
	itemContainer: {
		padding: 6,
		margin: 6,
		backgroundColor: "#eee",
	},
});

export default Test;
