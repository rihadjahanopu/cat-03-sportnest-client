"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import Link from "next/link";
import { Search, MapPin, Star, ArrowRight, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FacilitiesPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["facilities", search, type, page],
    queryFn: async () => {
      const res = await api.get(`/facilities`, {
        params: { search, sports: type, page },
      });
      return res.data.data;
    },
    keepPreviousData: true,
  });

  const sportsTypes = ["Football", "Basketball", "Tennis", "Cricket", "Badminton", "Swimming"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-4">Find Facilities</h1>
        <p className="text-slate-500 dark:text-gray-400">Discover and book the best sports venues around you.</p>
      </motion.div>

      <motion.div 
        className="flex flex-col md:flex-row gap-6 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <div className="flex-grow relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full bg-card border border-card-border rounded-xl pl-12 pr-4 py-4 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="w-full md:w-64 relative">
          <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
          <select
            className="w-full bg-card border border-card-border rounded-xl pl-12 pr-4 py-4 text-foreground appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors relative z-0"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Sports</option>
            {sportsTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass rounded-2xl h-96 animate-pulse">
              <div className="h-48 bg-white/5"></div>
              <div className="p-6 space-y-4">
                <div className="h-6 bg-white/5 rounded w-3/4"></div>
                <div className="h-4 bg-white/5 rounded w-1/2"></div>
                <div className="h-10 bg-white/5 rounded w-full mt-auto"></div>
              </div>
            </div>
          ))}
        </div>
      ) : data?.facilities?.length > 0 ? (
        <>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="popLayout">
              {data.facilities.map((facility) => (
                <motion.div
                  layout
                  key={facility._id}
                  variants={cardVariants}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass rounded-2xl overflow-hidden flex flex-col group transition-all hover:border-primary/50"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={facility.image || "https://images.unsplash.com/photo-1518605368461-1ee7e53c20bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                      alt={facility.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-secondary/80 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20">
                      ${facility.price_per_hour}/hr
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold line-clamp-1">{facility.name}</h3>
                      <div className="flex items-center gap-1 text-yellow-400 text-sm font-medium">
                        <Star className="w-4 h-4 fill-current" /> 4.8
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-gray-400 text-sm mb-4">
                      <MapPin className="w-4 h-4" /> <span className="line-clamp-1">{facility.location}</span>
                    </div>
                    <div className="mt-auto pt-4 border-t border-card-border flex justify-between items-center">
                      <span className="text-sm text-slate-500 dark:text-gray-400 bg-black/5 dark:bg-white/5 px-2 py-1 rounded">{facility.facility_type}</span>
                      <Link href={`/facilities/${facility._id}`} className="text-primary hover:text-primary-dark font-medium text-sm flex items-center gap-1">
                        Book Now <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Pagination */}
          {data?.pagination?.totalPages > 1 && (
            <motion.div 
              className="flex justify-center items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="px-4 py-2 glass rounded-lg disabled:opacity-50 hover:bg-white/5 transition-colors animate-pulse"
              >
                Previous
              </button>
              <span className="text-slate-500 dark:text-gray-400">
                Page {page} of {data.pagination.totalPages}
              </span>
              <button
                disabled={page === data.pagination.totalPages}
                onClick={() => setPage(p => p + 1)}
                className="px-4 py-2 glass rounded-lg disabled:opacity-50 hover:bg-white/5 transition-colors animate-pulse"
              >
                Next
              </button>
            </motion.div>
          )}
        </>
      ) : (
        <motion.div 
          className="text-center py-20 glass rounded-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h3 className="text-xl font-bold mb-2">No facilities found</h3>
          <p className="text-slate-500 dark:text-gray-400">Try adjusting your search or filters.</p>
        </motion.div>
      )}
    </div>
  );
}

