export interface Club {
  _id: string;
  name: string;
  description: string;
}

export interface Event {
  _id: string;
  clubId: string;
  title: string;
  description: string;
  scheduled_at: Date;
  // Add any other properties that are part of the Event object
}