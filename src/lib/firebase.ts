import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCIntlqH8b7lahyeRpXXkC5b9TWLoFuxyQ",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "myjobagant.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "myjobagant",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "myjobagant.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "893799021913",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:893799021913:web:8a8b7a7d2dc5432b1e6048",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-Z90HSSD2P2"
};

let app: FirebaseApp;
let auth: Auth;
let googleProvider: GoogleAuthProvider;
let db: Firestore;

// Guard against SSR / build-time evaluation when environment variables might not be loaded in worker threads
if (typeof window !== "undefined" || firebaseConfig.apiKey) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    db = getFirestore(app);
  } catch (error) {
    console.warn("Firebase initialization skipped during static prerendering:", error);
    app = {} as any;
    auth = {} as any;
    googleProvider = {} as any;
    db = {} as any;
  }
} else {
  app = {} as any;
  auth = {} as any;
  googleProvider = {} as any;
  db = {} as any;
}

export { app, auth, googleProvider, db };
