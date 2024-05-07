import React from "react";
import { Redirect, useRouter } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import Loading from "@/components/Container/Loading";

const HomeScreen = () => {
	const { session, loading, profile } = useAuth();
	if (!session) {
		return <Redirect href={"/(auth)/sign-in"} />;
	}
	if (loading || !profile) {
		return <Loading />;
	}
	if (profile?.group === "ADMIN") {
		return <Redirect href={"/(admin)/menu"} />;
	}
	// console.log(profile)

	return <Redirect href={"/(user)/menu"} />;

};

export default HomeScreen;
