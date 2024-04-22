import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Children } from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	ScrollView,
	Pressable,
} from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
	const { session, profile, setProfile }: any = useAuth();
	// console.log(profile);
	return (
		<SafeAreaView style={{ height: "100%" }}>
			<ScrollView style={styles.container}>
				<View style={styles.item}>
					<Text>UserName: {session?.user?.email}</Text>
					<FontAwesome name="user-circle" size={25} />
				</View>
				<View style={styles.item}>
					<Text>Email: {profile?.email}</Text>
					<FontAwesome name="envelope-o" size={25} />
				</View>
				<View style={styles.item}>
					<Text>Contact: {profile?.phone}</Text>
					<FontAwesome name="phone" size={25} />
				</View>
				<View style={styles.item}>
					<Text>Full Name: {profile?.full_name}</Text>
					<FontAwesome name="tag" size={25} />
				</View>
				<View style={styles.item}>
					<Text>Address: {profile?.address}</Text>
					<FontAwesome name="home" size={25} />
				</View>
				<Link href="/updateUser" style={styles.item} asChild>
					<Pressable style={{ backgroundColor: "#f1c40f" }}>
						<Text>Update information</Text>
						<FontAwesome name="hand-o-right" size={25} />
					</Pressable>
				</Link>
				<View style={{ alignItems: "center" }}>
					<Image
						source={require("@/assets/images/adaptive-icon.png")}
						alt="logo"
						style={{
							width: 200,
							height: 200,
						}}
					/>
				</View>
				<Button
					title="Sign out"
					onPress={async () => {
						await supabase.auth.signOut();
						setProfile(null);
					}}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	container: {
		padding: 10,
		marginTop: 50,
		flexDirection: "column",
		alignContent: "center",
	},
	item: {
		backgroundColor: "white",
		flex: 1,
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: "auto",
		paddingHorizontal: 10,
		textAlign: "left",
		marginHorizontal: 5,
		marginVertical: 5,
		borderRadius: 10,
		fontSize: 15,
		height: 50,
	},
});
export default ProfileScreen;
