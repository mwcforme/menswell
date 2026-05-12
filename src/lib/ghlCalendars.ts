import { ghl } from "@/lib/ghl";

export type LocationKey = "richmond" | "virginia-beach" | "newport-news";

export interface CenterCalendar {
  key: LocationKey;
  label: string;
  calendarId: string;
}

export const CENTER_CALENDARS: Record<LocationKey, CenterCalendar> = {
  richmond:        { key: "richmond",        label: "Richmond",        calendarId: "f57aKNaxejr3y1HeHFO9" },
  "virginia-beach":{ key: "virginia-beach",  label: "Virginia Beach",  calendarId: "YKNJFGFYB2RBJyzTczVx" },
  "newport-news":  { key: "newport-news",    label: "Newport News",    calendarId: "Ss4R5otK1MQAeUFxJDoi" },
};

export const TIMEZONE = "America/New_York";

export interface FreeSlot { startTime: string; endTime: string; }

interface FreeSlotsResponse {
  // GHL returns either { _dates_: { 'YYYY-MM-DD': { slots: string[] } } } or a flat array depending on version
  [date: string]: { slots: string[] } | unknown;
}

/** Fetch free appointment slots for a center between two ISO dates. */
export async function getFreeSlots(location: LocationKey, startDate: Date, endDate: Date) {
  const cal = CENTER_CALENDARS[location];
  const res = await ghl<FreeSlotsResponse>({
    path: `/calendars/${cal.calendarId}/free-slots`,
    method: "GET",
    injectLocationId: false, // calendar endpoint scopes by calendarId
    query: {
      startDate: startDate.getTime(),
      endDate: endDate.getTime(),
      timezone: TIMEZONE,
    },
  });
  return res.data;
}

export interface BookAppointmentInput {
  location: LocationKey;
  contactId: string;          // GHL contact id (create or upsert first)
  startTime: string;          // ISO string
  endTime?: string;           // optional, GHL infers from calendar duration
  title?: string;
  notes?: string;
}

/** Create a confirmed appointment on a center's calendar. */
export async function bookAppointment(input: BookAppointmentInput) {
  const cal = CENTER_CALENDARS[input.location];
  return ghl({
    path: "/calendars/events/appointments",
    method: "POST",
    body: {
      calendarId: cal.calendarId,
      contactId: input.contactId,
      startTime: input.startTime,
      ...(input.endTime ? { endTime: input.endTime } : {}),
      title: input.title ?? `Consultation - ${cal.label}`,
      appointmentStatus: "confirmed",
      ignoreDateRange: false,
      toNotify: true,
      ...(input.notes ? { notes: input.notes } : {}),
    },
  });
}

export interface UpsertContactInput {
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  source?: string;
  tags?: string[];
}

/** Upsert a contact and return its id (idempotent on email/phone). */
export async function upsertContact(input: UpsertContactInput): Promise<string> {
  const res = await ghl<{ contact?: { id: string }; new?: boolean }>({
    path: "/contacts/upsert",
    method: "POST",
    body: input,
  });
  const id = res.data?.contact?.id;
  if (!id) throw new Error("GHL upsertContact: missing contact id");
  return id;
}
