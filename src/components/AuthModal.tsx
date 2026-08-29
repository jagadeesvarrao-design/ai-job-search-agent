"use client";

import { useState } from "react";
import { 
  X, 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Loader2, 
  ShieldCheck, 
  CheckCircle2,
  Briefcase,
  AlertCircle
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "signin" | "signup";
}

export default function AuthModal({ isOpen, onClose, defaultMode = "signin" }: AuthModalProps) {
  const { user, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">(defaultMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
      setSuccess("Successfully signed in with Google!");
      setTimeout(() => {
        onClose();
        setSuccess("");
      }, 1000);
    } catch (err: any) {
      if (err.code === "auth/unauthorized-domain") {
        setError("Firebase Domain Notice: 'localhost' is not yet added to Authorized Domains in Firebase Console. You can use Email/Password sign-in below!");
      } else if (err.code === "auth/popup-closed-by-user") {
        setError("Sign-in popup was closed before completing.");
      } else {
        setError(err.message || "Failed to sign in with Google.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "signup") {
        await signUpWithEmail(email, password, displayName);
        setSuccess("Account created successfully!");
      } else {
        await signInWithEmail(email, password);
        setSuccess("Welcome back!");
      }
      setTimeout(() => {
        onClose();
        setSuccess("");
      }, 1000);
    } catch (err: any) {
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please click 'Sign In' below instead of creating a duplicate.");
      } else if (err.code === "auth/account-exists-with-different-credential") {
        setError("An account already exists with this email via Google Sign-In. Please click 'Continue with Google'.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Please use at least 6 characters with letters and numbers.");
      } else {
        setError(err.message || "Authentication failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#1A1F1F]/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF9F6] dark:bg-[#222828] rounded-3xl border border-[#D8E2DA] dark:border-[#2D3636] shadow-2xl max-w-md w-full overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#D8E2DA] dark:border-[#2D3636] flex justify-between items-center bg-gradient-to-r from-teal-50/40 via-white to-blue-50/40 dark:from-[#222828] dark:via-[#1F2525] dark:to-[#222828]">
          <div className="flex items-center gap-2.5">
            <div className="bg-[#476550] text-white p-2 rounded-xl shadow-sm">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-lg text-black dark:text-white leading-tight">
                {user ? "Your Account" : mode === "signin" ? "Sign In to ZenScout AI" : "Create Your Account"}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {user ? "Manage your profile & subscriptions" : "Save your applications & sync across devices"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {user ? (
            /* Logged in state */
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/40 text-[#476550] dark:text-[#A2BCA8] flex items-center justify-center text-xl font-bold mx-auto">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || "User"} className="w-full h-full rounded-full object-cover" />
                ) : (
                  user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()
                )}
              </div>

              <div>
                <h4 className="font-extrabold text-base text-black dark:text-white">{user.displayName || "ZenScout Member"}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{user.email}</p>
              </div>

              <div className="p-3 bg-[#E8F0EB] dark:bg-emerald-950/40 border border-[#A2BCA8]/40 dark:border-emerald-900 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Account Active & Synced</span>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={async () => {
                    await signOut();
                    onClose();
                  }}
                  className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold py-2.5 px-4 rounded-xl text-xs transition-all"
                >
                  Sign Out
                </button>

                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to delete all locally stored resumes, scouted jobs, and application data from this browser?")) {
                      localStorage.removeItem("my_profile");
                      localStorage.removeItem("jobs");
                      localStorage.removeItem("user_tier");
                      localStorage.removeItem("user_quota");
                      window.dispatchEvent(new Event("user-tier-updated"));
                      alert("All local data has been permanently cleared.");
                      onClose();
                      window.location.reload();
                    }
                  }}
                  className="w-full bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 font-medium py-2 px-4 rounded-xl text-[11px] transition-all border border-rose-200/60 dark:border-rose-900/60"
                >
                  Delete All Local Workspace Data
                </button>
              </div>
            </div>
          ) : (
            /* Sign in / Sign up form */
            <div className="space-y-4">
              {/* 1-Click Google Sign-In */}
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full bg-[#FAF9F6] dark:bg-[#1F2525] hover:bg-[#F4F4F0] dark:hover:bg-slate-800 text-black dark:text-white border border-[#D8E2DA] dark:border-[#2D3636] font-bold py-3 px-4 rounded-2xl text-xs transition-all flex items-center justify-center gap-2.5 shadow-sm active:scale-95 disabled:opacity-50"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="flex items-center my-3">
                <div className="flex-1 border-t border-slate-200 dark:border-slate-800"></div>
                <span className="px-3 text-[11px] text-slate-400 font-bold uppercase tracking-wider">or email</span>
                <div className="flex-1 border-t border-slate-200 dark:border-slate-800"></div>
              </div>

              {/* Error / Success Alerts */}
              {error && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-semibold rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="p-3 bg-[#E8F0EB] dark:bg-emerald-950/40 border border-[#A2BCA8]/40 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 text-xs font-semibold rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{success}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleEmailAuth} className="space-y-3">
                {mode === "signup" && (
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Your Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        required
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Alex Kumar"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#D8E2DA] dark:border-[#2D3636] bg-[#FAF9F6] dark:bg-[#1F2525] text-xs font-medium text-black dark:text-white focus:outline-none focus:border-[#476550]"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#D8E2DA] dark:border-[#2D3636] bg-[#FAF9F6] dark:bg-[#1F2525] text-xs font-medium text-black dark:text-white focus:outline-none focus:border-[#476550]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#D8E2DA] dark:border-[#2D3636] bg-[#FAF9F6] dark:bg-[#1F2525] text-xs font-medium text-black dark:text-white focus:outline-none focus:border-[#476550]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#476550] hover:bg-[#3A5342] dark:bg-[#6B9077] dark:hover:bg-[#55735E] text-white font-black py-3 px-4 rounded-xl text-xs transition-all shadow-md active:scale-95 btn-tactile flex items-center justify-center gap-1.5 disabled:opacity-50 mt-2"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>{mode === "signin" ? "Sign In" : "Create Account"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Mode Toggle Switch */}
              <div className="text-center pt-2">
                {mode === "signin" ? (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Don't have an account?{" "}
                    <button
                      onClick={() => {
                        setMode("signup");
                        setError("");
                      }}
                      className="text-[#476550] dark:text-[#A2BCA8] font-bold hover:underline"
                    >
                      Sign Up Free
                    </button>
                  </p>
                ) : (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Already have an account?{" "}
                    <button
                      onClick={() => {
                        setMode("signin");
                        setError("");
                      }}
                      className="text-[#476550] dark:text-[#A2BCA8] font-bold hover:underline"
                    >
                      Sign In
                    </button>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Security Footer */}
        <div className="px-6 py-3 bg-[#F4F4F0] dark:bg-[#1F2525]/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Encrypted Authentication via Firebase • Zero-Knowledge Storage</span>
        </div>
      </div>
    </div>
  );
}
