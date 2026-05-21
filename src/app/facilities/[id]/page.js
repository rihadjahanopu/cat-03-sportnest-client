import { notFound } from "next/navigation";
import FacilityDetailsLayout from "./FacilityDetailsLayout";

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

  return <FacilityDetailsLayout facility={facility} />;
}

