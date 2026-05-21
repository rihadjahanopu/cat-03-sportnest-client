"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Calendar, Clock, MapPin, XCircle, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function MyBookingsPage() {
  const queryClient = useQueryClient();
  const [removedBookingIds, setRemovedBookingIds] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("removed-bookings");
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: async () => {
      const res = await api.get("/bookings");
      // Backend returns { success: true, data: [...] }
      return res.data.data ?? [];
    },
    refetchInterval: 3000, // Real-time updates every 3 seconds
    refetchOnWindowFocus: true,
  });

  const cancelBooking = useMutation({
    mutationFn: async (id) => {
      await api.patch(`/bookings/${id}/cancel`);
    },
    onSuccess: () => {
      toast.success("Booking cancelled successfully");
      queryClient.invalidateQueries(["my-bookings"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to cancel booking");
    },
  });

  const handleRemoveCard = (id) => {
    const updated = [...removedBookingIds, id];
    setRemovedBookingIds(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("removed-bookings", JSON.stringify(updated));
    }
    toast.success("Booking card removed successfully");
  };

  const visibleBookings = bookings?.filter((b) => !removedBookingIds.includes(b._id)) ?? [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
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
        <h1 className="text-4xl font-bold mb-4">My Bookings</h1>
        <p className="text-slate-500 dark:text-gray-400">Manage your upcoming and past bookings.</p>
      </motion.div>

      {isLoading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass rounded-2xl h-40 animate-pulse"></div>
          ))}
        </div>
      ) : visibleBookings.length > 0 ? (
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {visibleBookings.map((booking) => (
              <motion.div 
                layout
                key={booking._id} 
                variants={cardVariants}
                exit={{ opacity: 0, x: 50, scale: 0.95 }}
                className="glass p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-center border border-black/5 dark:border-white/5 hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                  <img 
                    src={booking.facility_id?.image || "https://images.unsplash.com/photo-1518605368461-1ee7e53c20bc?ixlib=rb-4.0.3"} 
                    alt="Facility" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-grow flex flex-col justify-between h-full space-y-4 md:space-y-0">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{booking.facility_id?.name || 'Unknown Facility'}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/20' :
                        booking.status === 'confirmed' ? 'bg-primary/20 text-primary border-primary/20' :
                        'bg-red-500/20 text-red-500 border-red-500/20'
                      }`}>
                        {booking.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-gray-400 text-sm mb-4">
                      <MapPin className="w-4 h-4" /> <span>{booking.facility_id?.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" /> {booking.booking_date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-accent" /> {booking.time_slot} ({booking.hours} hrs)
                    </div>
                    <div className="font-bold text-lg text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-lg">
                      ${booking.total_price}
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-auto mt-4 md:mt-0 flex-shrink-0">
                  {booking.status !== 'cancelled' ? (
                    <button
                      onClick={() => cancelBooking.mutate(booking._id)}
                      disabled={cancelBooking.isPending}
                      className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors disabled:opacity-50 cursor-pointer text-sm font-bold"
                    >
                      <XCircle className="w-4 h-4" /> Cancel
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRemoveCard(booking._id)}
                      className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gray-500 text-slate-500 dark:text-gray-400 hover:bg-gray-500/10 hover:text-foreground transition-colors cursor-pointer text-sm font-bold"
                    >
                      <Trash2 className="w-4 h-4" /> Remove Card
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div 
          className="text-center py-20 glass rounded-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h3 className="text-xl font-bold mb-2">No bookings found</h3>
          <p className="text-slate-500 dark:text-gray-400 mb-6">You haven&apos;t made any bookings yet.</p>
        </motion.div>
      )}
    </div>
  );
}

