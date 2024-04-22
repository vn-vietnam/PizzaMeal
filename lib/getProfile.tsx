import { Session } from "@supabase/supabase-js";
import { supabase } from "./supabase";

export const fetchProfile = async (session: Session, setProfile: { (value: any): void; (arg0: { avatar_url: string | null; full_name: string | null; group: string; id: string; updated_at: string | null; username: string | null; website: string | null; } | null): void; }): Promise<any> => {
	if (session) {
		try {
			const { data } = await supabase
				.from("profiles")
				.select("*")
				.eq("id", session.user.id)
				.single();
			setProfile(data || null);
		} catch (error) {
			console.error("Error fetching profile:", error);
		}
	}
};
