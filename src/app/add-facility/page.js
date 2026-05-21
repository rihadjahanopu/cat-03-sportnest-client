"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/axios";
import { motion } from "framer-motion";

const facilitySchema = z.object({
	name: z.string().min(3, "Name must be at least 3 characters"),
	facility_type: z.string().min(1, "Type is required"),
	location: z.string().min(5, "Location must be at least 5 characters"),
	price_per_hour: z.number().min(1, "Price must be greater than 0"),
	capacity: z.number().min(1, "Capacity must be greater than 0"),
	description: z.string().min(20, "Description must be at least 20 characters"),
	image: z.string().url("Please enter a valid image URL"),
});

export default function AddFacilityPage() {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { user } = useAuth();
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(facilitySchema),
	});

	const imageUrlValue = watch("image");

	const onSubmit = async (data) => {
		if (!user) {
			toast.error("You must be logged in to add a facility");
			return;
		}

		setLoading(true);
		try {
			const payload = {
				...data,
				owner_email: user.email,
				available_slots: [
					"09:00",
					"10:00",
					"11:00",
					"12:00",
					"14:00",
					"15:00",
					"16:00",
					"17:00",
					"18:00",
				],
			};

			await api.post("/facilities", payload);

			await queryClient.invalidateQueries({ queryKey: ["my-facilities"] });

			toast.success("Facility added successfully!");
			router.push("/manage-facilities");
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to add facility");
		} finally {
			setLoading(false);
		}
	};

	const sportsTypes = [
		"Football",
		"Basketball",
		"Tennis",
		"Cricket",
		"Badminton",
		"Swimming",
	];

	return (
		<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<motion.div
				className="mb-12"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}>
				<h1 className="text-4xl font-bold mb-4">Add Your Facility</h1>
				<p className="text-slate-500 dark:text-gray-400">
					Partner with SportNest and start getting bookings.
				</p>
			</motion.div>

			<motion.div
				className="glass p-8 rounded-2xl"
				initial={{ opacity: 0, y: 25 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					type: "spring",
					stiffness: 100,
					damping: 15,
					delay: 0.1,
				}}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-8">
					{/* Image URL Input with live preview */}
					<div>
						<label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-2">
							Facility Image URL
						</label>
						<input
							{...register("image")}
							type="url"
							className="w-full bg-secondary/50 border border-card-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
							placeholder="e.g. https://images.unsplash.com/photo-1518605368461-1ee7e53c20bc"
						/>
						{errors.image && (
							<p className="text-red-400 text-xs mt-1">
								{errors.image.message}
							</p>
						)}

						{imageUrlValue && !errors.image && (
							<div className="mt-4 relative w-full h-64 rounded-xl overflow-hidden border border-card-border shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
								<img
									src={imageUrlValue}
									alt="Live Preview"
									className="w-full h-full object-cover"
									onError={(e) => {
										e.target.style.display = "none";
									}}
								/>
							</div>
						)}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-2">
								Facility Name
							</label>
							<input
								{...register("name")}
								className="w-full bg-secondary/50 border border-card-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
								placeholder="e.g. Green Turf Arena"
							/>
							{errors.name && (
								<p className="text-red-400 text-xs mt-1">
									{errors.name.message}
								</p>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-2">
								Sport Type
							</label>
							<select
								{...register("facility_type")}
								className="w-full bg-secondary/50 border border-card-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none">
								<option value="">Select a sport</option>
								{sportsTypes.map((t) => (
									<option
										key={t}
										value={t}>
										{t}
									</option>
								))}
							</select>
							{errors.facility_type && (
								<p className="text-red-400 text-xs mt-1">
									{errors.facility_type.message}
								</p>
							)}
						</div>

						<div className="md:col-span-2">
							<label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-2">
								Location / Address
							</label>
							<input
								{...register("location")}
								className="w-full bg-secondary/50 border border-card-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
								placeholder="Full address of the facility"
							/>
							{errors.location && (
								<p className="text-red-400 text-xs mt-1">
									{errors.location.message}
								</p>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-2">
								Price Per Hour ($)
							</label>
							<input
								{...register("price_per_hour", { valueAsNumber: true })}
								type="number"
								className="w-full bg-secondary/50 border border-card-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
								placeholder="50"
							/>
							{errors.price_per_hour && (
								<p className="text-red-400 text-xs mt-1">
									{errors.price_per_hour.message}
								</p>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-2">
								Capacity (Players)
							</label>
							<input
								{...register("capacity", { valueAsNumber: true })}
								type="number"
								className="w-full bg-secondary/50 border border-card-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
								placeholder="14"
							/>
							{errors.capacity && (
								<p className="text-red-400 text-xs mt-1">
									{errors.capacity.message}
								</p>
							)}
						</div>

						<div className="md:col-span-2">
							<label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-2">
								Owner Email
							</label>
							<input
								type="email"
								readOnly
								value={user?.email || "Loading..."}
								className="w-full bg-secondary/30 border border-card-border rounded-lg px-4 py-3 text-slate-400 dark:text-gray-400 cursor-not-allowed"
							/>
						</div>

						<div className="md:col-span-2">
							<label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-2">
								Description
							</label>
							<textarea
								{...register("description")}
								rows="4"
								className="w-full bg-secondary/50 border border-card-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
								placeholder="Describe your facility, amenities, rules, etc."></textarea>
							{errors.description && (
								<p className="text-red-400 text-xs mt-1">
									{errors.description.message}
								</p>
							)}
						</div>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-primary hover:bg-primary-dark text-white dark:text-secondary font-bold py-4 rounded-xl transition-all shadow-[0_0_15px_rgba(21,128,61,0.15)] dark:shadow-[0_0_15px_rgba(57,255,20,0.3)] hover:shadow-[0_0_25px_rgba(21,128,61,0.3)] dark:hover:shadow-[0_0_25px_rgba(57,255,20,0.5)] disabled:opacity-50 disabled:cursor-not-allowed text-lg">
						{loading ? "Adding Facility..." : "Add Facility"}
					</button>
				</form>
			</motion.div>
		</div>
	);
}
