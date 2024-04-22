import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { View, Text, Image, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

const ProfileScreen = () => {
	const { session, profile, setProfile }: any = useAuth();
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				gap: 10,
			}}
		>
			<Image
				source={require("@/assets/images/adaptive-icon.png")}
				alt="logo"
				style={{
					width: 200,
					height: 200,
				}}
			/>
			<Text style={{ textAlign: "center", fontSize: 15, marginBottom: 20 }}>
				Email: {session?.user?.email}
			</Text>
			<Button
				title="Sign out"
				onPress={async () => {
					await supabase.auth.signOut();
					setProfile(null);
				}}
			/>
		</View>
	);
};
const styles = StyleSheet.create({});
export default ProfileScreen;
