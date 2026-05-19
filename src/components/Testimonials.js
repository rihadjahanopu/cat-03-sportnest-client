import { Target, Star } from "lucide-react";

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

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
          <Target className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold tracking-wider uppercase text-primary">Voices from the field</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">What Our Athletes Say</h2>
        <p className="text-gray-400 max-w-xl mx-auto">Hear testimonies from tournament organizers, casual players, and stadium owners.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <div key={idx} className="glass p-8 rounded-3xl border border-white/5 flex flex-col justify-between hover:border-white/10 transition-colors shadow-lg relative">
            <span className="text-6xl text-primary/10 font-serif absolute top-4 left-6 pointer-events-none">“</span>
            <div className="relative z-10 mb-6">
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 italic leading-relaxed">
                "{t.quote}"
              </p>
            </div>
            <div className="flex items-center gap-4 pt-6 border-t border-white/5 mt-auto relative z-10">
              <img 
                src={t.avatar} 
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover border border-primary/20"
              />
              <div>
                <h4 className="font-extrabold text-white">{t.name}</h4>
                <p className="text-xs text-gray-500 font-bold">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
