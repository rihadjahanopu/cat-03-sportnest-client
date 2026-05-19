import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-36">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-accent/15 z-0"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm animate-pulse">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold tracking-wider uppercase text-gray-300">Fastest Turf Booking System</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8 leading-none">
          Find Your <span className="text-gradient bg-gradient-to-r from-primary via-emerald-400 to-accent">Perfect Turf</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Instantly reserve elite courts, sports fields, and arenas near you. Host competitive matches, track slots in real-time, and join the ultimate local sports revolution.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link
            href="/facilities"
            className="bg-primary hover:bg-primary-dark text-secondary px-10 py-5 rounded-full text-lg font-black transition-all shadow-[0_0_30px_rgba(57,255,20,0.4)] hover:shadow-[0_0_40px_rgba(57,255,20,0.6)] flex items-center justify-center gap-2 hover:-translate-y-1"
          >
            Browse Facilities <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/add-facility"
            className="glass border border-white/10 hover:border-primary/40 px-10 py-5 rounded-full text-lg font-bold transition-all hover:bg-white/10 flex items-center justify-center gap-2 hover:-translate-y-1"
          >
            Partner With Us
          </Link>
        </div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-24 pt-8 border-t border-white/5">
          <div className="text-center">
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">15K+</h3>
            <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">Active Players</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl md:text-5xl font-black text-primary tracking-tight mb-2">250+</h3>
            <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">Elite Arenas</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">99%</h3>
            <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">Happy Bookings</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl md:text-5xl font-black text-accent tracking-tight mb-2">24/7</h3>
            <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">Instant Access</p>
          </div>
        </div>
      </div>
    </section>
  );
}
