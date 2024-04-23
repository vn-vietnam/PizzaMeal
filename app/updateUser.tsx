import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Button,
	ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, Stack, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { useUpdateProfiles } from "@/api/profile";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/lib/supabase";

const UserUpdate = () => {
	const { session, setProfile, profile }: any = useAuth();
	// console.log(profile);
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [address, setAdress] = useState("");
	const [phone, setPhone] = useState("");
	const { mutate: updateProfile } = useUpdateProfiles();
	const [errors, setErrors] = useState("");
	const router = useRouter();

	const validateInput = () => {
		setErrors("");
		if (!name) {
			setErrors("Name is required");
			return false;
		}
		if (!address) {
			setErrors("Address is required");
			return false;
		}
		if (!phone) {
			setErrors("Phone is required");
			return false;
		}
		if (!email) {
			setErrors("Email is required");
			return false;
		}
		return true;
	};

	useEffect(() => {
		if (profile) {
			setName(profile?.full_name);
			setAdress(profile?.address);
			setPhone(profile?.phone?.toString());
			setEmail(profile?.email);
		}
	}, [profile]);

	const submitUpdate = async () => {
		if (!validateInput()) {
			return;
		}
		updateProfile(
			{ id: profile?.id, full_name: name, email, address, phone },
			{
				onSuccess: async () => {
					// console.log("success");
					ToastAndroid.show("Update successfully", ToastAndroid.BOTTOM);
					await supabase.auth.signOut();
					setProfile(null);
					router.replace("/");
				},
			}
		);
	};
	return (
		<View style={styles.container}>
			<Stack.Screen options={{ headerShown: true, headerBackTitle: "back" }} />
			<Text style={{ fontSize: 55, marginBottom: 20, fontWeight: "bold" }}>
				Update
			</Text>
			<Text style={styles.label}>Full Name</Text>
			<TextInput
				value={name}
				onChangeText={setName}
				placeholder="your name..."
				style={styles.input}
			/>
			<Text style={styles.label}>Address</Text>
			<TextInput
				value={address}
				onChangeText={setAdress}
				placeholder="address ..."
				style={styles.input}
			/>
			<Text style={styles.label}>Phone</Text>
			<TextInput
				value={phone}
				onChangeText={setPhone}
				placeholder="phone..."
				style={styles.input}
				keyboardType="numeric"
			/>

			<Text style={styles.label}>Email</Text>
			<TextInput
				value={email}
				onChangeText={setEmail}
				placeholder="email..."
				style={styles.input}
				// secureTextEntry
			/>
			<Text style={{ color: "red", marginBottom: 20 }}>{errors}</Text>
			<Button title="submit" onPress={submitUpdate} />
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
export default UserUpdate;
