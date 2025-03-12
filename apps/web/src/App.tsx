"use client"

import { useEffect, useState, useCallback } from "react"
import type { Club, Event } from "@/types"
import ClubList from "@/components/club-list"
import EventList from "@/components/event-list"
import CreateClubModal from "@/components/create-club-modal"
import CreateEventModal from "@/components/create-event-modal"
import { apiClient } from "./lib/api-client"

export default function App() {
  const [clubs, setClubs] = useState<Club[]>([])
  const [events, setEvents] = useState<Event[]>([])

  const [isClubsLoading, setIsClubsLoading] = useState(true)
  const [isEventsLoading, setIsEventsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [selectedClub, setSelectedClub] = useState<Club | null>(null)

  const [isCreateClubModalOpen, setIsCreateClubModalOpen] = useState(false)
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false)

  const [searchQuery, setSearchQuery] = useState<string>("")
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("")

  // Update debounced search query after a delay
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 300) // 300ms delay

    return () => {
      clearTimeout(handler)
    }
  }, [searchQuery])

  // Fetch clubs from the API
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setIsClubsLoading(true)
        const clubsData = await apiClient.getClubs(debouncedSearchQuery)
        setClubs(clubsData.data)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("An unknown error occurred")
        }
      } finally {
        setIsClubsLoading(false)
      }
    }

    fetchClubs()
  }, [debouncedSearchQuery]) // Use debouncedSearchQuery as a dependency

  // Handle club selection
  const handleClubSelect = (club: Club) => {
    setSelectedClub(club)
    setIsEventsLoading(true)
    // Fetch events for this club from an API
    apiClient.getEvents(club._id).then(response => {
      setEvents(response.data) // Ensure response.data is of type Event[]
      setIsEventsLoading(false)
    }).catch(err => {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred")
      }
      setIsEventsLoading(false)
    })
  }

  // Handle club creation
  const handleCreateClub = (newClub: Club) => {
    setClubs([newClub, ...clubs])
    setIsCreateClubModalOpen(false)
    setSelectedClub(newClub)
  }

  // Handle event creation
  const handleCreateEvent = (newEvent: Event) => {
    setEvents([newEvent, ...events].sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()))
    setIsCreateEventModalOpen(false)
  }

  // Handle search input change
  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }, [])

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
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search clubs..."
          className="w-full mb-4 p-2 border rounded-md"
        />
        {isClubsLoading ? (
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
              <h2 className="text-xl font-bold">{selectedClub.name} Events</h2>
              <button
                onClick={() => setIsCreateEventModalOpen(true)}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
              >
                Create Event
              </button>
            </div>
            <EventList events={events} isLoading={isEventsLoading} />
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
          clubId={selectedClub._id}
        />
      )}
    </main>
  )
}

