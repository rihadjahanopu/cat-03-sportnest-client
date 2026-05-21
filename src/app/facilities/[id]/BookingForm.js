"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/axios";
import { motion } from "framer-motion";

const bookingSchema = z.object({
  booking_date: z.string().min(1, "Please select a date"),
  time_slot: z.string().min(1, "Please select a time slot"),
  hours: z.number().min(1).max(5),
});

export default function BookingForm({ facility }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      hours: 1,
    },
  });

  const hours = useWatch({ control, name: "hours" });
  const totalPrice = facility.price_per_hour * (hours || 1);

  const onSubmit = async (data) => {
    if (!user) {
      toast.error("Please login to book a facility");
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        facility_id: facility._id,
        booking_date: data.booking_date,
        time_slot: data.time_slot,
        hours: data.hours,
        total_price: totalPrice,
      };

      await api.post("/bookings", payload);
      
      toast.success("Booking confirmed successfully!");
      router.push("/my-bookings");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to book facility");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
      className="glass p-8 rounded-2xl border-t-4 border-primary shadow-[0_10px_40px_rgba(57,255,20,0.1)]"
    >
      <h3 className="text-2xl font-bold mb-2">Book a Slot</h3>
      <p className="text-slate-500 dark:text-gray-400 mb-6 text-sm">Select your preferred time and date.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-2">Date</label>
          <input
            {...register("booking_date")}
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className="w-full bg-secondary/50 border border-card-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          />
          {errors.booking_date && <p className="text-red-400 text-xs mt-1">{errors.booking_date.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-2">Time Slot</label>
          <select
            {...register("time_slot")}
            className="w-full bg-secondary/50 border border-card-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none"
          >
            <option value="">Select a time slot</option>
            {facility.available_slots?.map(slot => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
          {errors.time_slot && <p className="text-red-400 text-xs mt-1">{errors.time_slot.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-2">Duration (Hours)</label>
          <input
            {...register("hours", { valueAsNumber: true })}
            type="number"
            min="1"
            max="5"
            className="w-full bg-secondary/50 border border-card-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          />
          {errors.hours && <p className="text-red-400 text-xs mt-1">{errors.hours.message}</p>}
        </div>

        <div className="pt-4 border-t border-card-border">
          <div className="flex justify-between items-center mb-6">
            <span className="text-slate-600 dark:text-gray-300">Total Price</span>
            <span className="text-2xl font-bold text-primary">${totalPrice}</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white dark:text-secondary font-bold py-4 rounded-xl transition-all shadow-[0_0_15px_rgba(21,128,61,0.15)] dark:shadow-[0_0_15px_rgba(57,255,20,0.3)] hover:shadow-[0_0_25px_rgba(21,128,61,0.3)] dark:hover:shadow-[0_0_25px_rgba(57,255,20,0.5)] disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {loading ? "Processing..." : "Confirm Booking"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

