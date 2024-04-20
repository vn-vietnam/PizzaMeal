import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { View, Text, Button } from "react-native";

const ProfileScreen = () => {
	const { session, profile }: any = useAuth();
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				gap: 10,
			}}
		>
			<Text style={{ textAlign: "center" }}>{session?.user?.email}</Text>
			<Text style={{ textAlign: "center" }}>{profile?.group}</Text>

			<Button
				title="Sign out"
				onPress={async () => await supabase.auth.signOut()}
			/>
		</View>
	);
};

export default ProfileScreen;
