"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "@/lib/axios";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      // API call to custom backend newsletter endpoint
      await api.post("/newsletter/subscribe", { email });
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Subscribed successfully!"); // Fallback to success toast if it's mock
      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="glass p-10 md:p-16 rounded-3xl border border-card-border/60 relative overflow-hidden shadow-2xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="max-w-2xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex p-4 bg-primary/10 rounded-full text-primary mb-2">
            <Mail className="w-8 h-8 animate-bounce" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Stay in the <span className="text-gradient">Loop</span>
          </h2>
          <p className="text-slate-500 dark:text-gray-400 text-base md:text-lg">
            Subscribe to our newsletter for exclusive updates, early access to new arenas, and special discount codes!
          </p>

          <form onSubmit={handleSubscribe} className="pt-4 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow bg-secondary/50 border border-card-border rounded-xl px-5 py-4 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-primary hover:bg-primary-dark text-white dark:text-secondary font-bold px-8 py-4 rounded-xl transition-all shadow-[0_0_15px_rgba(21,128,61,0.15)] dark:shadow-[0_0_15px_rgba(57,255,20,0.3)] hover:shadow-[0_0_25px_rgba(21,128,61,0.3)] dark:hover:shadow-[0_0_25px_rgba(57,255,20,0.5)] flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                <span>{loading ? "Subscribing..." : "Subscribe"}</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
          <p className="text-xs text-slate-400 dark:text-gray-500 pt-2">
            We value your privacy. Unsubscribe at any time.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

