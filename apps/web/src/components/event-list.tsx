import type { Event } from "@/types"
import { format } from "date-fns"

interface EventListProps {
  events: Event[]
  isLoading: boolean
}

export default function EventList({ events, isLoading }: EventListProps) {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Loading events...</p>
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No events yet. Create one to get started!</p>
      </div>
    )
  }

  return (
    <ul className="space-y-4">
      {events.map((event) => (
        <li key={event._id} className="border rounded-lg p-4">
          <h3 className="text-lg font-medium">{event.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
          <p className="text-sm font-medium mt-2">
            <span className="text-muted-foreground">Scheduled for: </span>
            {format(new Date(event.scheduled_at), "PPP 'at' p")}
          </p>
        </li>
      ))}
    </ul>
  )
}

