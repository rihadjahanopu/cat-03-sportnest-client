import Link from "next/link";
import { Flame } from "lucide-react";

export default function SportsCategories() {
  const sportsCategories = [
    { name: "Football", count: "45+ Arenas", image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=600&q=80", color: "from-green-500/20 to-transparent" },
    { name: "Basketball", count: "32+ Courts", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80", color: "from-orange-500/20 to-transparent" },
    { name: "Tennis", count: "18+ Courts", image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=600&q=80", color: "from-yellow-500/20 to-transparent" },
    { name: "Cricket", count: "25+ Grounds", image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=600&q=80", color: "from-emerald-500/20 to-transparent" },
    { name: "Badminton", count: "40+ Courts", image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80", color: "from-cyan-500/20 to-transparent" },
    { name: "Swimming", count: "12+ Pools", image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=80", color: "from-blue-500/20 to-transparent" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
          <Flame className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold tracking-wider uppercase text-primary">Browse By Category</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Popular Sports Categories</h2>
        <p className="text-gray-400 max-w-xl mx-auto">Explore high-quality fields categorized by your favorite athletic fields.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {sportsCategories.map((category) => (
          <Link 
            key={category.name}
            href={`/facilities?type=${category.name}`}
            className="group relative h-60 rounded-2xl overflow-hidden glass border border-white/5 hover:border-primary/40 transition-all duration-300 flex flex-col justify-end p-6 hover:-translate-y-2 shadow-lg"
          >
            <div className="absolute inset-0 z-0">
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${category.color} via-background/60 to-background/90 z-10`}></div>
            </div>
            
            <div className="relative z-20">
              <h3 className="text-lg font-black text-white group-hover:text-primary transition-colors mb-1">{category.name}</h3>
              <p className="text-xs text-gray-400 font-semibold">{category.count}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
