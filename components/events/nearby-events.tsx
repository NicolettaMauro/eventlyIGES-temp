"use client";

import { useEffect, useState, useCallback } from "react";
import EventList from "@/components/events/events-list";
import ClientPagination from "@/components/altre/pagination";
import { SafeNearbyEvent } from "@/app/types/nearby";
import { User } from "@prisma/client";
import useLocation from "@/hooks/use-location";
import { Button } from "../ui/button";
import Link from "next/link";

interface NearbyEventsProps {
  currentUser?: User | null;
}

const NearbyEvents: React.FC<NearbyEventsProps> = ({ currentUser }) => {
  const { userCoords, loadingLocation } = useLocation();

  const [events, setEvents] = useState<SafeNearbyEvent[]>([]);
  const [page, setPage] = useState(1);
  const [serverPage, setServerPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const eventsPerPage = 5;

  const fetchEvents = useCallback(async (pageToFetch: number) => {
    if (!userCoords) return;

    try {
      const res = await fetch(
        `/api/nearby-events?lat=${userCoords.lat}&lng=${userCoords.lng}&limit=${eventsPerPage}&page=${pageToFetch}`
      );
      const data = await res.json();
      if (data?.events && data.events.length > 0) {
        const upcoming = data.events.filter(
          (e: SafeNearbyEvent) => new Date(e.eventDate) > new Date()
        );

        setEvents((prev) => [...prev, ...upcoming]);
        if (data.events.length < eventsPerPage) setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Errore fetch eventi vicini:", err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [userCoords]);


  // Fetch iniziale
  useEffect(() => {
    setEvents([]);
    setPage(1);
    setServerPage(1);
    setHasMore(true);
    setLoading(true);

    if (userCoords) fetchEvents(1);
  }, [userCoords, fetchEvents]);


  if (loading || loadingLocation) return <div>Caricamento eventi vicini...</div>;

  if (!events.length)
    return (
      <div>
        <div>Nessun evento trovato.</div>
        <Link href="/">
          <Button variant="outline" size="default">
            Rimuovi i filtri
          </Button>
        </Link>
      </div>
    );

  const startIndex = (page - 1) * eventsPerPage;
  const paginatedEvents = events.slice(startIndex, startIndex + eventsPerPage);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const fetchMoreEvents = async () => {
    const nextServerPage = serverPage + 1;
    await fetchEvents(nextServerPage);
    setServerPage(nextServerPage);
  };

  return (
    <div>
      <div
        key={page}
        className="pt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
      >
        <EventList events={paginatedEvents} currentUser={currentUser as User} />
      </div>

      <ClientPagination totalPages={totalPages} page={page} setPage={setPage} />

      {events.length >= eventsPerPage && (
        <div className="flex justify-center mt-4">
          <button
            disabled={!hasMore}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md transition ${
              !hasMore ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
            onClick={fetchMoreEvents}
          >
            Vedi Altro
          </button>
        </div>
      )}
    </div>
  );
};

export default NearbyEvents;

