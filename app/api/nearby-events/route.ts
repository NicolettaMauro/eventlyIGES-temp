// app/api/nearby-events/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { manualStatus } from "@prisma/client";

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));

  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    return NextResponse.json({ error: "Coordinate mancanti" }, { status: 400 });
  }

  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "";

  // Recupera tutti gli eventi attivi (senza filtrare troppo)
  const events = await db.event.findMany({
    where: {
      status: manualStatus.ACTIVE,
      ...(category ? { category } : {}),
      ...(query ? { title: { contains: query, mode: "insensitive" as const } } : {}),
    },
  });

  type EventWithDistance = (typeof events)[number] & { distance: number };

  const eventsWithDistance: EventWithDistance[] = events.map((event) => {
    const eventLat = Number(event.latitudine);
    const eventLng = Number(event.longitudine);

    // Se lat/lng non validi, assegna 0 km (così compare nell’elenco)
    const distance = isNaN(eventLat) || isNaN(eventLng)
      ? 0
      : haversineDistance(lat, lng, eventLat, eventLng);

    return { ...event, distance };
  });

  // Filtro eventi entro 70 km e solo futuri
    const MAX_RADIUS = 70; // km
    const filteredEvents = eventsWithDistance
      .filter((e) => e.distance <= MAX_RADIUS)
      .filter((e) => e.eventDate > new Date());

    // Ordina per distanza
    filteredEvents.sort((a, b) => a.distance - b.distance);

    return NextResponse.json({ events: filteredEvents });

}
