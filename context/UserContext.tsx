import { useRouter } from "next/router";
import React, { useContext, useState, useEffect, FC, ReactNode } from "react";
import { supabase } from "../utils/supabase";

type UserContextType = {
  user: any;
  login: () => void;
  logout: () => void;
  loading: boolean;
};

type UserProviderProps = {
  children: ReactNode;
};

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<any | undefined>(null);
  const [loading, setLoading] = useState(true);

  function login() {
    return supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  function logout() {
    return async () => {
      await supabase.auth.signOut();
      setUser(null);
      router.push("/");
    };
  }

  async function getUser() {
    const { data, error } = await supabase.auth.getSession();
    if (data && data.session && data.session.user) {
      const profileData = await getUserProfile(data.session.user.id);
      console.log({ profileData });
      const user = { ...data.session.user, ...profileData };
      setUser(user);
    }
    setLoading(false);
  }

  async function getUserProfile(userId: string) {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    return profile;
  }

  useEffect(() => {
    getUser();
    setLoading(false);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user;
        if (currentUser) {
          const profileData = await getUserProfile(currentUser.id);
          const user = { ...currentUser, ...profileData };
          setUser(user);
        }
        setLoading(false);
      }
    );

    // Clean up subscription
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
