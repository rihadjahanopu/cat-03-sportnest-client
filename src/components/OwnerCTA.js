"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function OwnerCTA() {
	const contentVariants = {
		hidden: { opacity: 0, x: -30 },
		visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
	};

	const buttonVariants = {
		hidden: { opacity: 0, x: 30 },
		visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.1 } },
	};

	return (
		<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
			<div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/20 via-background/10 to-accent/20 border border-black/10 dark:border-white/10 p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
				<div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

				<motion.div
					className="relative z-10 max-w-2xl text-center md:text-left"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
					variants={contentVariants}>
					<h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
						Own a Sports Facility?
					</h2>
					<p className="text-lg md:text-xl text-slate-600 dark:text-gray-300 mb-0 leading-relaxed">
						List your sports courts, manage open booking slots, accept digital
						deposits, and maximize your occupancy rates on SportNest. Join our
						partner grid today!
					</p>
				</motion.div>

				<motion.div
					className="relative z-10 flex-shrink-0"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
					variants={buttonVariants}>
					<Link
						href="/add-facility"
						className="text-gray-950! bg-white hover:bg-gray-100 px-10 py-5 rounded-full text-lg font-black transition-all flex items-center justify-center gap-2 hover:-translate-y-1 shadow-2xl">
						List Your Venue Now{" "}
						<ArrowRight className="w-5 h-5 text-gray-950!" />
					</Link>
				</motion.div>
			</div>
		</section>
	);
}
