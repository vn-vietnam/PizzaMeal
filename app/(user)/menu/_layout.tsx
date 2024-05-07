import Header from "@/components/Header";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function MenuStack() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerTitleAlign: "center",
					header: () => <Header />,
				}}
			/>
		</Stack>
	);
}
