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

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/";
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
};

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<any | undefined>(null);
  const [loading, setLoading] = useState(true);

  const setUserValue = (data: any) => {
    setUser(data);
  };

  function login() {
    return supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: getURL(),
      },
    });
  }

  function logout() {
    return async () => {
      await supabase.auth.signOut();
      setUserValue(null);
      router.push("/");
    };
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
