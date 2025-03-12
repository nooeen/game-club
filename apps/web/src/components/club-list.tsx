"use client"

import type { Club } from "../types"

interface ClubListProps {
  clubs: Club[]
  selectedClub: string | null
  onSelectClub: (club: Club) => void
}

export default function ClubList({ clubs, selectedClub, onSelectClub }: ClubListProps) {
  if (clubs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No clubs yet. Create one to get started!</p>
      </div>
    )
  }

  return (
    <ul className="space-y-2">
      {clubs.map((club) => (
        <li
          key={club._id}
          className={`p-3 rounded-md cursor-pointer hover:bg-muted transition-colors ${
            selectedClub === club._id ? "bg-muted" : ""
          }`}
          onClick={() => onSelectClub(club)}
        >
          <h3 className="font-medium">{club.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{club.description}</p>
        </li>
      ))}
    </ul>
  )
}

