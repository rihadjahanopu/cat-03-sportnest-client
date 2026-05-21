"use client";

import Link from "next/link";
import { ArrowRight, Compass, Star, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturedFacilities({ facilities = [] }) {
  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 85, damping: 14 },
    },
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="flex justify-between items-end mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={headerVariants}
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <Compass className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-xs font-bold tracking-wider uppercase text-accent">Top Venues</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Featured Arenas</h2>
          <p className="text-slate-500 dark:text-gray-400">Discover and book the most popular venues near you.</p>
        </div>
        <Link href="/facilities" className="text-primary hover:text-primary-dark font-extrabold flex items-center gap-1 hover:gap-2 transition-all">
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={listVariants}
      >
        {facilities.map((facility) => (
          <motion.div 
            key={facility._id} 
            variants={cardVariants}
            className="glass rounded-3xl overflow-hidden flex flex-col group transition-all duration-300 hover:border-primary/50 hover:-translate-y-2 border border-black/5 dark:border-white/5 shadow-xl"
          >
            <div className="relative h-56 overflow-hidden">
              <img 
                src={facility.image || "https://images.unsplash.com/photo-1518605368461-1ee7e53c20bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                alt={facility.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-secondary/90 backdrop-blur-md text-primary text-xs font-black px-4 py-2 rounded-full border border-primary/20 shadow-lg">
                ${facility.price_per_hour}/hr
              </div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-bold tracking-tight line-clamp-1">{facility.name}</h3>
                <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold bg-black/5 dark:bg-white/5 px-2 py-1 rounded-lg">
                  <Star className="w-4 h-4 fill-current" /> 4.8
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-500 dark:text-gray-400 text-sm mb-6">
                <MapPin className="w-4 h-4 text-primary" /> <span className="line-clamp-1">{facility.location}</span>
              </div>
              <div className="mt-auto pt-5 border-t border-card-border flex justify-between items-center">
                <span className="text-xs font-bold text-slate-600 dark:text-gray-300 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-3 py-1.5 rounded-full">{facility.facility_type}</span>
                <Link href={`/facilities/${facility._id}`} className="text-primary hover:text-primary-dark font-extrabold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-all">
                  Book Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
        {facilities.length === 0 && (
          <motion.div 
            variants={cardVariants}
            className="col-span-full py-24 text-center text-slate-500 dark:text-gray-400 glass rounded-3xl border border-black/5 dark:border-white/5"
          >
            No facilities available yet. Be the first to add one!
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

