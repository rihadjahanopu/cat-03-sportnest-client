import FeaturedFacilities from "@/components/FeaturedFacilities";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import OwnerCTA from "@/components/OwnerCTA";
import SportsCategories from "@/components/SportsCategories";
import Testimonials from "@/components/Testimonials";
import WhyChoose from "@/components/WhyChoose";

async function getFeaturedFacilities() {
	try {
		const apiBase =
			process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
		const res = await fetch(`${apiBase}/facilities/featured`, {
			cache: "no-store", // Disable cache so edited/new facilities appear instantly on visit
		});
		if (!res.ok) return [];
		const json = await res.json();
		return json.data ?? [];
	} catch (error) {
		return [];
	}
}

export default async function Home() {
	const facilities = (await getFeaturedFacilities()) || [];

	return (
		<div className="flex flex-col gap-24 pb-20 overflow-hidden">
			<Hero />

			<SportsCategories />

			<FeaturedFacilities facilities={facilities} />

			<WhyChoose />

			<Testimonials />

			<OwnerCTA />

			<Newsletter />
		</div>
	);
}
