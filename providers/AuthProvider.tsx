import { fetchProfile } from "@/lib/getProfile";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

type AuthData = {
	session: Session | null;
	profile: any;
	setProfile: any;
	loading: boolean;
};

const AuthContext = createContext<AuthData>({
	session: null,
	loading: true,
	profile: null,
	setProfile: null
});

export default function AuthProvider({ children }: PropsWithChildren) {
	const [session, setSession] = useState<Session | null>(null);
	const [profile, setProfile] = useState<any | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
		setLoading(false);
	}, []);
	useEffect(() => {
		if (session) {
			fetchProfile(session, setProfile);
		}
	}, [session]);

	return (
		<AuthContext.Provider value={{ session, loading, profile, setProfile }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
