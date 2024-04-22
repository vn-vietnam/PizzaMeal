import { useAuth } from "@/providers/AuthProvider";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
	const { session,profile } = useAuth();
	// console.log(profile)
	if (session) {
		return <Redirect href={"/"} />;
	}

	return <Stack />;
}
