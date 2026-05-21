"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, user, loading: authLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (user && !authLoading) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      toast.success("Login successful!");
      router.push("/");
      router.refresh();
    } catch (err) {
      toast.error(err.message || err.response?.data?.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      toast.error(err.message || "Google login failed");
    }
  };

  if (authLoading || user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="glass p-8 rounded-2xl w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm">Login to your SportNest account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-2">Email</label>
            <input
              {...register("email")}
              type="email"
              className="w-full bg-secondary/50 border border-card-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-2">Password</label>
            <input
              {...register("password")}
              type="password"
              className="w-full bg-secondary/50 border border-card-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white dark:text-secondary font-bold py-3 rounded-lg transition-all shadow-[0_0_15px_rgba(21,128,61,0.15)] dark:shadow-[0_0_15px_rgba(57,255,20,0.3)] hover:shadow-[0_0_25px_rgba(21,128,61,0.3)] dark:hover:shadow-[0_0_25px_rgba(57,255,20,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="h-px bg-card-border flex-1"></div>
          <span className="text-sm text-slate-500 dark:text-gray-400">or</span>
          <div className="h-px bg-card-border flex-1"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          type="button"
          className="mt-6 w-full glass hover:bg-black/5 dark:hover:bg-white/5 font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        <p className="mt-8 text-center text-sm text-slate-500 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary hover:text-primary-dark font-medium">
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
