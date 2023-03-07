import { useRouter } from "next/router";
import React, { useContext, useState, useEffect, FC, ReactNode } from "react";
import { supabase } from "../utils/supabase";
import axios from "axios";
import storage from "../utils/storage";
import { setAuthToken } from "../utils/modifyRequestHeder";

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

  const setUserValue = (data: any) => {
    setUser(data);
  };

  const getURL = () => {
    let url = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/dashboard/check/`;
    return url;
  };

  function login() {
    console.log({ getURL: getURL() });
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: getURL(),
      },
    });
  }

  function logout() {
    const fun = async () => {
      await supabase.auth.signOut();
      setUserValue(null);
      setTimeout(() => {
        router.push("/");
      }, 100);
    };
    fun();
  }

  async function getUser() {
    const { data, error } = await supabase.auth.getSession();

    if (data && data.session && data.session.user) {
      const profileData = await getUserProfile(data.session.user.id);

      const user = { ...data.session.user, ...profileData };
      setUserValue(user);
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
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user;
        if (currentUser) {
          const profileData = await getUserProfile(currentUser.id);
          const user = { ...currentUser, ...profileData };
          setUserValue(user);
        }
        setLoading(false);
      }
    );

    // Clean up subscription
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) return;
    const mySubscription = supabase
      .channel("changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "profiles",
          filter: `id=eq.${user.id}`,
        },
        (payload) => {
          setUserValue({ ...user, ...payload.new });
        }
      )
      .subscribe();

    return () => {
      if (mySubscription) {
        supabase.removeChannel(mySubscription);
      }
    };
  }, [user]);

  useEffect(() => {
    const setTokenInCookie = async () => {
      if (user) {
        const session = supabase.auth.getSession();
        const sessionData = await session?.then((data) => {
          return data.data.session;
        });
        if (sessionData) {
          storage.cookie.set("token", sessionData?.access_token || "");

          setAuthToken(sessionData?.access_token);
        }
      }
    };
    setTokenInCookie();
  }, [user]);

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
