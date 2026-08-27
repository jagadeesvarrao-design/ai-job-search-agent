"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  updateProfile,
  GoogleAuthProvider
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { syncUserSubscriptionFromFirestore } from "@/lib/user-tier";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth || typeof window === "undefined") {
      setLoading(false);
      return;
    }

    try {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);
        setLoading(false);

        if (currentUser) {
          // Automatically synchronize Zen Suite Ultimate & Cross-Subscription entitlement from Cloud Firestore
          try {
            await syncUserSubscriptionFromFirestore(currentUser);
          } catch (syncErr) {
            console.warn("Background Firestore subscription sync skipped:", syncErr);
          }
        }
      });

      return () => unsubscribe();
    } catch (e) {
      console.warn("Auth state observer skipped:", e);
      setLoading(false);
    }
  }, []);

  const signInWithGoogle = async () => {
    if (!auth) throw new Error("Authentication is not initialized.");
    try {
      // First attempt fast auto-login with existing browser Google session
      const cred = await signInWithPopup(auth, googleProvider);
      if (cred.user) {
        await syncUserSubscriptionFromFirestore(cred.user);
      }
    } catch (error: any) {
      // If silent auto-login prompt needs user selection, fallback gracefully
      if (error.code === "auth/popup-closed-by-user" || error.code === "auth/cancelled-popup-request") {
        throw error;
      }
      try {
        const fallbackProvider = new GoogleAuthProvider();
        fallbackProvider.setCustomParameters({ prompt: "select_account" });
        const cred = await signInWithPopup(auth, fallbackProvider);
        if (cred.user) {
          await syncUserSubscriptionFromFirestore(cred.user);
        }
      } catch (fallbackError: any) {
        console.error("Google Sign-In Error:", fallbackError);
        throw fallbackError;
      }
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    if (!auth) throw new Error("Authentication is not initialized.");
    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      if (cred.user) {
        await syncUserSubscriptionFromFirestore(cred.user);
      }
    } catch (error: any) {
      console.error("Email Sign-In Error:", error);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name?: string) => {
    if (!auth) throw new Error("Authentication is not initialized.");
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      if (name && cred.user) {
        await updateProfile(cred.user, { displayName: name });
      }
      if (cred.user) {
        await syncUserSubscriptionFromFirestore(cred.user);
      }
    } catch (error: any) {
      console.error("Email Sign-Up Error:", error);
      throw error;
    }
  };

  const signOut = async () => {
    if (!auth) return;
    try {
      await fbSignOut(auth);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("user-tier-updated"));
      }
    } catch (error: any) {
      console.error("Sign-Out Error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
