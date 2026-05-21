"use client";

import { Activity, Trophy, CalendarCheck, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyChoose() {
  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 12 },
    },
  };

  return (
    <section className="bg-secondary/40 py-24 border-y border-card-border relative">
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Activity className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-xs font-bold tracking-wider uppercase text-primary">Unrivaled Perks</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Why Choose SportNest?</h2>
          <p className="text-slate-500 dark:text-gray-400 max-w-xl mx-auto">We streamline physical activity coordinate so you can focus entirely on playing.</p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={listVariants}
        >
          <motion.div 
            variants={cardVariants}
            className="flex flex-col items-center text-center p-8 glass rounded-3xl border border-black/5 dark:border-white/5 hover:border-primary/30 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/35 to-primary/5 flex items-center justify-center mb-6 text-primary shadow-[0_0_20px_rgba(57,255,20,0.15)]">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-foreground">Premium Stadiums</h3>
            <p className="text-slate-500 dark:text-gray-400 leading-relaxed">Access only verified, top-tier complexes with modern amenities, professional turfing, and gear rentals.</p>
          </motion.div>
          
          <motion.div 
            variants={cardVariants}
            className="flex flex-col items-center text-center p-8 glass rounded-3xl border border-black/5 dark:border-white/5 hover:border-accent/30 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/35 to-accent/5 flex items-center justify-center mb-6 text-accent shadow-[0_0_20px_rgba(255,0,128,0.15)]">
              <CalendarCheck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-foreground">Instant Slots</h3>
            <p className="text-slate-500 dark:text-gray-400 leading-relaxed">Book in less than 60 seconds with real-time slot checking, transparent pricing models, and no hidden booking fees.</p>
          </motion.div>
          
          <motion.div 
            variants={cardVariants}
            className="flex flex-col items-center text-center p-8 glass rounded-3xl border border-black/5 dark:border-white/5 hover:border-purple-500/30 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/35 to-purple-500/5 flex items-center justify-center mb-6 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-foreground">100% Protected</h3>
            <p className="text-slate-500 dark:text-gray-400 leading-relaxed">Cancel slots instantly under flexible schedules. Secure payment routing and direct owner coordination gates.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

