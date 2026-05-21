"use client";

import { Target, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sabbir Rahman",
      role: "Club Striker",
      quote: "Booking our weekly turf was a nightmare until we found SportNest. Dynamic scheduling and instant billing save us hours of coordination!",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
      rating: 5
    },
    {
      name: "Tamima Ahmed",
      role: "Badminton Enthusiast",
      quote: "The glassmorphic interface is gorgeous and ultra-responsive on mobile! Finding premium air-conditioned courts near me takes less than a minute.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
      rating: 5
    },
    {
      name: "Ahsan Habib",
      role: "Tournament Organizer",
      quote: "Managing three sports centers used to be complex. SportNest's owner panel lets us track bookings, price tiers, and payouts effortlessly.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80",
      rating: 5
    }
  ];

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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="text-center mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={headerVariants}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
          <Target className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-xs font-bold tracking-wider uppercase text-primary">Voices from the field</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">What Our Athletes Say</h2>
        <p className="text-slate-500 dark:text-gray-400 max-w-xl mx-auto">Hear testimonies from tournament organizers, casual players, and stadium owners.</p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={listVariants}
      >
        {testimonials.map((t, idx) => (
          <motion.div 
            key={idx} 
            variants={cardVariants}
            className="glass p-8 rounded-3xl border border-black/5 dark:border-white/5 flex flex-col justify-between hover:border-black/10 dark:hover:border-white/10 transition-colors shadow-lg relative"
          >
            <span className="text-6xl text-primary/10 font-serif absolute top-4 left-6 pointer-events-none">“</span>
            <div className="relative z-10 mb-6">
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 dark:text-gray-300 italic leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-4 pt-6 border-t border-black/5 dark:border-white/5 mt-auto relative z-10">
              <img 
                src={t.avatar} 
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover border border-primary/20"
              />
              <div>
                <h4 className="font-extrabold text-foreground">{t.name}</h4>
                <p className="text-xs text-slate-400 dark:text-gray-500 font-bold">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

