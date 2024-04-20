import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import Loading from "@/components/Container/Loading";
const index = () => {
	const { session, loading } = useAuth();
	const [profile, setProfile] = useState<any | null>(null);
	useEffect(() => {
		const fetchProfile = async () => {
			if (session) {
				try {
					const { data } = await supabase
						.from("profiles")
						.select("*")
						.eq("id", session?.user?.id)
						.single();
					setProfile(data || null);
				} catch (error) {
					console.error("Error fetching profile:", error);
				}
			}
		};
		if (session) {
			fetchProfile();
		}
	}, [session]);
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
