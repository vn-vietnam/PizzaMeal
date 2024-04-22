import React from "react";
import { Redirect } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import Loading from "@/components/Container/Loading";

const index = () => {
	const { session, loading, profile } = useAuth();
	console.log(profile)
	if (!session) {
		return <Redirect href={"/sign-in"} />;
	}
	if (loading || !profile) {
		return <Loading />;
	}
	if (profile?.group === "ADMIN") {
		return <Redirect href={"/(admin)/menu"} />;
	} else {
		return <Redirect href={"/(user)/menu"} />;
	}
};

export default index;
