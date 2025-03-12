"use client"

import { useEffect, useState } from "react"
import type { Club, Event } from "@/types"
import ClubList from "@/components/club-list"
import EventList from "@/components/event-list"
import CreateClubModal from "@/components/create-club-modal"
import CreateEventModal from "@/components/create-event-modal"
import { apiClient } from "./lib/api-client"

export default function App() {
  const [clubs, setClubs] = useState<Club[]>([])
  const [events, setEvents] = useState<Event[]>([])

  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [selectedClub, setSelectedClub] = useState<string | null>(null)

  const [isCreateClubModalOpen, setIsCreateClubModalOpen] = useState(false)
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false)

  // Fetch clubs from the API
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setIsLoading(true)
        const clubsData = await apiClient.getClubs()
        setClubs(clubsData.data)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("An unknown error occurred")
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchClubs()
  }, [])

  // Handle club selection
  const handleClubSelect = (club: Club) => {
    setSelectedClub(club._id)
    // Fetch events for this club from an API
    apiClient.getEvents(club._id).then(response => {
      setEvents(response.data) // Ensure response.data is of type Event[]
    }).catch(err => {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred")
      }
    })
  }

  // Handle club creation
  const handleCreateClub = (newClub: Club) => {
    setClubs([newClub, ...clubs])
    setIsCreateClubModalOpen(false)
    setSelectedClub(newClub._id)
  }

  // Handle event creation
  const handleCreateEvent = (newEvent: Event) => {
    setEvents([newEvent, ...events].sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()))
    setIsCreateEventModalOpen(false)
  }

  return (
    <main className="flex min-h-screen flex-col md:flex-row">
      <div className="w-full md:w-1/3 border-r p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Clubs</h2>
          <button
            onClick={() => setIsCreateClubModalOpen(true)}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
          >
            Create Club
          </button>
        </div>
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <ClubList clubs={clubs} selectedClub={selectedClub} onSelectClub={handleClubSelect} />
        )}
      </div>

      <div className="w-full md:w-2/3 p-4">
        {selectedClub ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{clubs.find(club => club._id === selectedClub)?.name} Events</h2>
              <button
                onClick={() => setIsCreateEventModalOpen(true)}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
              >
                Create Event
              </button>
            </div>
            <EventList events={events} />
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Select a club to view events</p>
          </div>
        )}
      </div>

      <CreateClubModal
        isOpen={isCreateClubModalOpen}
        onClose={() => setIsCreateClubModalOpen(false)}
        onCreateClub={handleCreateClub}
      />

      {selectedClub && (
        <CreateEventModal
          isOpen={isCreateEventModalOpen}
          onClose={() => setIsCreateEventModalOpen(false)}
          onCreateEvent={handleCreateEvent}
          clubId={selectedClub}
        />
      )}
    </main>
  )
}

