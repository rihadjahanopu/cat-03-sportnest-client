"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { MapPin, Trash2, Edit, Star } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function ManageFacilitiesPage() {
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState(null);
  const [editFacility, setEditFacility] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    facility_type: "",
    price_per_hour: 0,
    capacity: 0,
    location: "",
    image: "",
    description: ""
  });

  const { data: facilities, isLoading } = useQuery({
    queryKey: ["my-facilities"],
    queryFn: async () => {
      const res = await api.get("/facilities/me");
      // Backend returns { success: true, data: [...] }
      return res.data.data ?? [];
    },
  });

  const deleteFacility = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/facilities/${id}`);
    },
    onSuccess: () => {
      toast.success("Facility deleted successfully");
      queryClient.invalidateQueries(["my-facilities"]);
      setDeleteId(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to delete facility");
      setDeleteId(null);
    },
  });

  const updateFacility = useMutation({
    mutationFn: async ({ id, data }) => {
      await api.patch(`/facilities/${id}`, data);
    },
    onSuccess: () => {
      toast.success("Facility updated successfully");
      queryClient.invalidateQueries(["my-facilities"]);
      setEditFacility(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to update facility");
    },
  });

  const handleEditClick = (facility) => {
    setEditFacility(facility);
    setEditForm({
      name: facility.name,
      facility_type: facility.facility_type,
      price_per_hour: facility.price_per_hour,
      capacity: facility.capacity,
      location: facility.location,
      image: facility.image || "",
      description: facility.description
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: name === "price_per_hour" || name === "capacity" ? Number(value) : value,
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editForm.name || !editForm.facility_type || !editForm.location || !editForm.price_per_hour || !editForm.capacity) {
      toast.error("Please fill in all required fields");
      return;
    }
    updateFacility.mutate({ id: editFacility._id, data: editForm });
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const modalOverlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
  };

  const modalContentVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 16 } },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-4">Manage My Facilities</h1>
        <p className="text-slate-500 dark:text-gray-400">View and manage the facilities you have listed.</p>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass rounded-2xl h-96 animate-pulse"></div>
          ))}
        </div>
      ) : facilities?.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {facilities?.map((facility) => (
              <motion.div 
                layout
                key={facility._id} 
                variants={cardVariants}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass rounded-2xl overflow-hidden flex flex-col transition-all hover:border-primary/50 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={facility.image || "https://images.unsplash.com/photo-1518605368461-1ee7e53c20bc?ixlib=rb-4.0.3"} 
                    alt={facility.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                  <div className="mt-auto pt-4 border-t border-card-border flex gap-4">
                    <button
                      onClick={() => handleEditClick(facility)}
                      className="flex-1 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-foreground font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(facility._id)}
                      className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
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
          <h3 className="text-xl font-bold mb-2">No facilities listed</h3>
          <p className="text-slate-500 dark:text-gray-400">You haven&apos;t listed any facilities yet.</p>
        </motion.div>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div 
              className="glass p-8 rounded-2xl max-w-md w-full border border-card-border shadow-2xl"
              variants={modalContentVariants}
            >
              <h3 className="text-2xl font-bold mb-4">Delete Facility?</h3>
              <p className="text-slate-500 dark:text-gray-400 mb-8">
                Are you sure you want to delete this facility? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 font-bold py-3 rounded-xl transition-colors"
                  disabled={deleteFacility.isPending}
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteFacility.mutate(deleteId)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
                  disabled={deleteFacility.isPending}
                >
                  {deleteFacility.isPending ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Facility Modal */}
      <AnimatePresence>
        {editFacility && (
          <motion.div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div 
              className="glass p-8 rounded-2xl max-w-2xl w-full border border-card-border shadow-2xl my-8"
              variants={modalContentVariants}
            >
              <h3 className="text-3xl font-bold mb-2">Edit Facility</h3>
              <p className="text-slate-500 dark:text-gray-400 mb-6">Modify the details of your sports complex below.</p>
              
              <form onSubmit={handleEditSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-2">Facility Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={editForm.name}
                    onChange={handleFormChange}
                    className="w-full bg-secondary/50 border border-card-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="e.g. Green Turf Arena"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-2">Sport Type *</label>
                    <select
                      name="facility_type"
                      required
                      value={editForm.facility_type}
                      onChange={handleFormChange}
                      className="w-full bg-secondary/50 border border-card-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none"
                    >
                      <option value="">Select a sport</option>
                      {["Football", "Basketball", "Tennis", "Cricket", "Badminton", "Swimming"].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-2">Location / Address *</label>
                    <input
                      type="text"
                      name="location"
                      required
                      value={editForm.location}
                      onChange={handleFormChange}
                      className="w-full bg-secondary/50 border border-card-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="Full address of the facility"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-2">Price Per Hour ($) *</label>
                    <input
                      type="number"
                      name="price_per_hour"
                      required
                      min="1"
                      value={editForm.price_per_hour}
                      onChange={handleFormChange}
                      className="w-full bg-secondary/50 border border-card-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-2">Capacity (Players) *</label>
                    <input
                      type="number"
                      name="capacity"
                      required
                      min="1"
                      value={editForm.capacity}
                      onChange={handleFormChange}
                      className="w-full bg-secondary/50 border border-card-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="14"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-2">Facility Image URL</label>
                  <input
                    type="url"
                    name="image"
                    value={editForm.image}
                    onChange={handleFormChange}
                    className="w-full bg-secondary/50 border border-card-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-2">Description</label>
                  <textarea
                    name="description"
                    rows="4"
                    value={editForm.description}
                    onChange={handleFormChange}
                    className="w-full bg-secondary/50 border border-card-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                    placeholder="Describe your facility, rules, and amenities..."
                  ></textarea>
                </div>

                <div className="flex gap-4 pt-4 border-t border-card-border">
                  <button
                    type="button"
                    onClick={() => setEditFacility(null)}
                    className="flex-1 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 font-bold py-3 rounded-xl transition-colors"
                    disabled={updateFacility.isPending}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary-dark text-white dark:text-secondary font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(21,128,61,0.15)] dark:shadow-[0_0_15px_rgba(57,255,20,0.3)] disabled:opacity-50"
                    disabled={updateFacility.isPending}
                  >
                    {updateFacility.isPending ? "Saving Changes..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

