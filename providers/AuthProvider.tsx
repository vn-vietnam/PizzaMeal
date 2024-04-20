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
	loading: boolean;
};

const AuthContext = createContext<AuthData>({
	session: null,
	loading: true,
	profile: null,
});

export default function AuthProvider({ children }: PropsWithChildren) {
	const [session, setSession] = useState<Session | null>(null);
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
		setLoading(false)
	}, []);

	return (
		<AuthContext.Provider value={{ session, loading, profile }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
