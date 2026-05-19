import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function OwnerCTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/20 via-background/10 to-accent/20 border border-white/10 p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-2xl text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">Own a Sports Facility?</h2>
          <p className="text-lg md:text-xl text-gray-300 mb-0 leading-relaxed">
            List your sports courts, manage open booking slots, accept digital deposits, and maximize your occupancy rates on SportNest. Join our partner grid today!
          </p>
        </div>

        <div className="relative z-10 flex-shrink-0">
          <Link
            href="/add-facility"
            className="bg-white hover:bg-gray-100 text-secondary px-10 py-5 rounded-full text-lg font-black transition-all flex items-center justify-center gap-2 hover:-translate-y-1 shadow-2xl"
          >
            List Your Venue Now <ArrowRight className="w-5 h-5 text-secondary" />
          </Link>
        </div>
      </div>
    </section>
  );
}
