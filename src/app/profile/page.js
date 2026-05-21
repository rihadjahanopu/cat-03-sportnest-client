"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { User, Mail, Camera, Shield, Calendar, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [updating, setUpdating] = useState(false);

  // Sync state with user details when session completes loading
  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please login to access your profile");
      router.push("/login");
    } else if (user) {
      if (name !== (user.name || "")) {
        setTimeout(() => setName(user.name || ""), 0);
      }
      if (imageUrl !== (user.image || "")) {
        setTimeout(() => setImageUrl(user.image || ""), 0);
      }
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-16 h-16 border-4 border-t-primary border-r-transparent border-white/5 rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setUpdating(true);
    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: imageUrl.trim() || null,
      });

      if (error) {
        throw new Error(error.message || "Failed to update profile");
      }

      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      {/* Back Button */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-gray-400 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column - Card Profile Overview */}
        <motion.div 
          className="lg:col-span-1 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <div className="glass p-8 rounded-3xl border border-black/5 dark:border-white/5 text-center flex flex-col items-center shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px] pointer-events-none"></div>
            
            {/* Avatar block with live preview error handling */}
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-primary/20 p-1 mb-6 bg-white/5">
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt="Profile Preview"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80";
                  }}
                />
              ) : (
                <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <User className="w-16 h-16" />
                </div>
              )}
            </div>

            <h2 className="text-2xl font-black mb-1">{user.name || "SportNest Athlete"}</h2>
            <p className="text-slate-500 dark:text-gray-400 text-sm mb-6 truncate max-w-full">{user.email}</p>

            <div className="w-full pt-6 border-t border-black/5 dark:border-white/5 space-y-4 text-left">
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-gray-300">
                <Shield className="w-4 h-4 text-primary" />
                <span>Account Status: </span>
                <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-0.5 rounded-full border border-primary/10">Active</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-gray-300">
                <Calendar className="w-4 h-4 text-accent" />
                <span>Member Since: </span>
                <span className="text-slate-400 dark:text-gray-400 font-semibold">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short" }) : "May 2026"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Profile Update Form */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
        >
          <div className="glass p-8 md:p-10 rounded-3xl border border-black/5 dark:border-white/5 shadow-xl">
            <h3 className="text-3xl font-black mb-2">Profile Settings</h3>
            <p className="text-slate-500 dark:text-gray-400 mb-8">Keep your display name and avatar up to date for bookings and turf managers.</p>

            <form onSubmit={handleUpdate} className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-2">Display Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-secondary/50 border border-card-border rounded-xl pl-12 pr-4 py-4 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              {/* Email Address (ReadOnly) */}
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-2">Email Address (Cannot be changed)</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    type="email"
                    readOnly
                    value={user.email}
                    className="w-full bg-secondary/20 border border-card-border/50 rounded-xl pl-12 pr-4 py-4 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Image URL Input */}
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-2">Profile Image URL</label>
                <div className="relative">
                  <Camera className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full bg-secondary/50 border border-card-border rounded-xl pl-12 pr-4 py-4 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="e.g. https://images.unsplash.com/..."
                  />
                </div>
                <p className="text-xs text-slate-400 dark:text-gray-500 mt-2">Provide a valid image link to display your custom player avatar.</p>
              </div>

              {/* Buttons */}
              <div className="pt-6 border-t border-black/5 dark:border-white/5 flex gap-4">
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="flex-1 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 font-bold py-4 rounded-xl transition-colors"
                  disabled={updating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary-dark text-white dark:text-secondary font-bold py-4 rounded-xl transition-all shadow-[0_0_15px_rgba(21,128,61,0.15)] dark:shadow-[0_0_15px_rgba(57,255,20,0.3)] disabled:opacity-50"
                  disabled={updating}
                >
                  {updating ? "Saving Details..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

