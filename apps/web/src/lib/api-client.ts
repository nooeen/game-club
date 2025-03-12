import { Club, Event } from "@/types";

const API_URL = import.meta.env.VITE_API_URL;

interface GetClubsResponse {
  data: Club[];
  created_at: number;
}

interface GetEventsResponse {
  data: Event[];
  created_at: number;
}

interface CreateClubRequest {
  name: string;
  description: string;
}

interface CreateEventRequest {
  title: string;
  description: string;
  scheduled_at: string;
}

export const apiClient = {
  getClubs: async (search: string = ""): Promise<GetClubsResponse> => {
    const response = await fetch(`${API_URL}/clubs?search=${encodeURIComponent(search)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch clubs');
    }

    return data;
  },

  getEvents: async (clubId: string): Promise<GetEventsResponse> => {
    const response = await fetch(`${API_URL}/clubs/${clubId}/events`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }); 

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch events');
    }

    return data;
  },

  createClub: async (club: CreateClubRequest): Promise<Club> => {
    const response = await fetch(`${API_URL}/clubs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(club),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create club');
    }

    return data;
  },

  createEvent: async (clubId: string, event: CreateEventRequest): Promise<Event> => {
    const response = await fetch(`${API_URL}/clubs/${clubId}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create event');
    }

    return data;
  },
}; 
