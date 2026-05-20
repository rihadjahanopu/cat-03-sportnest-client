import { notFound } from "next/navigation";
import { MapPin, Users, DollarSign, Calendar, Clock, Star } from "lucide-react";
import BookingForm from "./BookingForm";

async function getFacility(id) {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const res = await fetch(`${apiBase}/facilities/${id}`, {
      cache: "no-store"
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? json;
  } catch (error) {
    return null;
  }
}

export default async function FacilityDetailsPage({ params }) {
  const { id } = await params;
  const facility = await getFacility(id);

  if (!facility) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      <div className="relative h-96 md:h-[500px] w-full rounded-3xl overflow-hidden mb-12">
        <img 
          src={facility.image} 
          alt={facility.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold border border-primary/20 mb-4 inline-block">
                {facility.facility_type}
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4">{facility.name}</h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" /> {facility.location}
                </div>
                <div className="flex items-center gap-2 text-yellow-400">
                  <Star className="w-5 h-5 fill-current" /> 4.8 (120 reviews)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <section className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6">About this Facility</h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {facility.description}
            </p>
          </section>

          <section className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6">Facility Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary">
                  <DollarSign className="w-6 h-6" />
                </div>
                <span className="text-gray-400 text-sm">Price</span>
                <span className="font-bold">${facility.price_per_hour} / hour</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-accent">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-gray-400 text-sm">Capacity</span>
                <span className="font-bold">Up to {facility.capacity}</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-purple-400">
                  <Clock className="w-6 h-6" />
                </div>
                <span className="text-gray-400 text-sm">Timings</span>
                <span className="font-bold">09:00 - 18:00</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-orange-400">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-gray-400 text-sm">Availability</span>
                <span className="font-bold">Mon - Sun</span>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-28">
            <BookingForm facility={facility} />
          </div>
        </div>
      </div>
    </div>
  );
}
