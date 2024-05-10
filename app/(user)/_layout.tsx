import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Redirect, Tabs } from "expo-router";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useAuth } from "@/providers/AuthProvider";
import { BlurView } from "expo-blur";

function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"];
	color: string;
}) {
	return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const { session } = useAuth();

	if (!session) {
		return <Redirect href={"/"} />;
	}
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				headerShown: useClientOnlyValue(false, true),
				// headerTransparent: true,
				tabBarBackground: () => (
					<BlurView
						tint={'extraLight'}
						intensity={100}
						style={{
							flex: 1,
							backgroundColor: "rgba(0, 0, 0, 0.05)",
						}}
					/>
				),
				tabBarStyle: {
					backgroundColor: "transparent",
					position: "absolute",
					bottom: 0,
					left: 0,
					right: 0,
					elevation: 0,
				},
			}}
		>
			<Tabs.Screen name="index" options={{ href: null }} />
			<Tabs.Screen
				name="menu"
				options={{
					title: "Menu",
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="cutlery" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="orders"
				options={{
					title: "Order",
					headerShown: false,
					tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
				}}
			/>

			<Tabs.Screen
				name="notification"
				options={{
					title: "Notification",
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="newspaper-o" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
				}}
			/>
		</Tabs>
	);
}
