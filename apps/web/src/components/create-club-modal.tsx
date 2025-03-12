"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Club } from "@/types"
import { apiClient } from "@/lib/api-client"
// import { v4 as uuidv4 } from "uuid"

interface CreateClubModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateClub: (club: Club) => void
}

export default function CreateClubModal({ isOpen, onClose, onCreateClub }: CreateClubModalProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const validateForm = () => {
    const newErrors: { name?: string; description?: string } = {}

    if (!name.trim()) {
      newErrors.name = "Club name is required"
    }

    if (!description.trim()) {
      newErrors.description = "Description is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setApiError(null)

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Use the API client to create a club
      const response = await apiClient.createClub({ name, description })
      onCreateClub(response)
      setName("")
      setDescription("")
      setErrors({})
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message)
      } else {
        setApiError("Failed to create club. Please try again.")
      }
      console.error("Error creating club:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Club</DialogTitle>
        </DialogHeader>

        {apiError && <div className="bg-destructive/15 text-destructive p-3 rounded-md mb-4">{apiError}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Club Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter club name" />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter club description"
              rows={4}
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Club"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

