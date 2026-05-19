"use client";

import Link from "next/link";
import { ArrowLeft, Home, Compass, Trophy } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-[75vh] flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Background Glowing Orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background/40 to-background z-0 pointer-events-none"></div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Huge Animated 404 */}
        <div className="relative mb-6 select-none">
          <h1 className="text-[12rem] sm:text-[16rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/40 to-transparent opacity-25">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl sm:text-6xl font-black uppercase tracking-widest text-gradient bg-gradient-to-r from-primary via-emerald-400 to-accent animate-pulse">
              Offside!
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="glass p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-emerald-400 to-accent"></div>
          
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-6 text-primary animate-bounce">
            <Trophy className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 text-white">
            Lost on the Pitch?
          </h2>
          
          <p className="text-gray-400 text-sm sm:text-lg mb-8 max-w-md mx-auto leading-relaxed">
            You've wandered outside the playing area. The page you are looking for might have been moved, deleted, or never existed in the tournament bracket.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/"
              className="bg-primary hover:bg-primary-dark text-secondary px-8 py-4 rounded-full text-sm font-black transition-all shadow-[0_0_25px_rgba(57,255,20,0.3)] hover:shadow-[0_0_35px_rgba(57,255,20,0.5)] flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              <Home className="w-4 h-4" /> Back to Home
            </Link>

            <Link
              href="/facilities"
              className="glass border border-white/10 hover:border-primary/40 px-8 py-4 rounded-full text-sm font-bold transition-all hover:bg-white/5 flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              <Compass className="w-4 h-4 text-accent" /> Browse Arenas
            </Link>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-500 hover:text-white font-semibold transition-colors cursor-pointer bg-transparent border-none"
          >
            <ArrowLeft className="w-4 h-4" /> Go back to previous page
          </button>
        </div>
      </div>
    </div>
  );
}
