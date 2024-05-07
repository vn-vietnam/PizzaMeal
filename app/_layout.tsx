import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useColorScheme } from "@/components/useColorScheme";
import CartProvider from "@/providers/CartProvider";
import AuthProvider from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Header from "@/components/Header";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		...FontAwesome.font,
	});

	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	const colorScheme = useColorScheme();

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<AuthProvider>
				<QueryProvider>
					<GestureHandlerRootView style={{ flex: 1 }}>
						<CartProvider>
							<Stack
								screenOptions={{
									headerShown: false,
								}}
							>
								<Stack.Screen name="(user)" options={{ headerShown: false }} />
								<Stack.Screen name="(admin)" options={{ headerShown: false }} />
								<Stack.Screen name="(auth)" options={{ headerShown: false }} />
								<Stack.Screen
									name="cart"
									options={{ headerShown: true, headerTitle: "Cart" }}
								/>
								<Stack.Screen
									name="search"
									options={{
										headerTitleAlign: "center",
										header: () => <Header />,
									}}
								/>
							</Stack>
						</CartProvider>
					</GestureHandlerRootView>
				</QueryProvider>
			</AuthProvider>
		</ThemeProvider>
	);
}
