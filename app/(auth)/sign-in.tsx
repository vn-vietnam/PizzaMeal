import {
	View,
	Text,
	TextInput,
	StyleSheet,
	Alert,
	Image,
	ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import Button from "../../components/Button";
import Colors from "../../constants/Colors";
import { Link, Stack } from "expo-router";
import { supabase } from "@/lib/supabase";

const SignInScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	async function signInWithEmail() {
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			ToastAndroid.show(error.message, ToastAndroid.BOTTOM);
		} else {
			ToastAndroid.show("Login successfully", ToastAndroid.BOTTOM);
		}
		setLoading(false);
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ headerShown: false }} />
			<View style={{ alignItems: "center" }}>
				<Image
					source={require("@/assets/images/adaptive-icon.png")}
					alt="logo"
					style={{
						width: 200,
						height: 200,
					}}
				/>
				<Text
					style={{
						fontSize: 30,
						marginBottom: 20,
						fontWeight: "bold",
						color: "#f1c40f",
					}}
				>
					PizzaMeal
				</Text>
			</View>
			<Text style={{ fontSize: 55, marginBottom: 20, fontWeight: "bold" }}>
				Sign In
			</Text>
			<Text style={styles.label}>Email</Text>
			<TextInput
				value={email}
				onChangeText={setEmail}
				placeholder="email..."
				style={styles.input}
			/>

			<Text style={styles.label}>Password</Text>
			<TextInput
				value={password}
				onChangeText={setPassword}
				placeholder="password..."
				style={styles.input}
				secureTextEntry
			/>

			<Button
				onPress={signInWithEmail}
				disabled={loading}
				text={loading ? "Signing in..." : "Sign in"}
			/>
			<Link href="/sign-up" style={styles.textButton}>
				Create an account
			</Link>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
		justifyContent: "center",
		flex: 1,
	},
	label: {
		color: "gray",
	},
	input: {
		borderWidth: 1,
		borderColor: "gray",
		padding: 10,
		marginTop: 5,
		marginBottom: 20,
		backgroundColor: "white",
		borderRadius: 5,
	},
	textButton: {
		alignSelf: "center",
		fontWeight: "bold",
		color: Colors.light.tint,
		marginVertical: 10,
	},
});

export default SignInScreen;
