// Define an interface for a calendar event
interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  recurringRule?: RecurringEventRule;
}

interface RecurringEventRule {
  type: "daily" | "weekly" | "monthly";
  interval: number;
  endDate?: Date; 
  count?: number;
}

// Define an interface for the calendar itself
interface Calendar {
  createEvent(
    eventData: Omit<CalendarEvent, "id">,
    allowOverlap?: boolean
  ): Promise<CalendarEvent | string>; // Return string for error message

  listEventsInRange(startDate: Date, endDate: Date): Promise<CalendarEvent[]>;
  
  updateEvent(
    id: string,
    eventData: Omit<CalendarEvent, "id">,
    allowOverlap?: boolean
  ): Promise<CalendarEvent | string>; // Return string for error message
  
  deleteEvent(id: string): Promise<object | undefined>;
  
  updateRecurringEventRule(
    eventId: string,
    newRule: RecurringEventRule
  ): Promise<CalendarEvent | undefined>;

}

// Function to create a new calendar Event
function createCalendar(): Calendar {
  const events: CalendarEvent[] = [];

  // Create Event
  async function createEvent(
    eventData: Omit<CalendarEvent, "id">,
    allowOverlap = false
  ): Promise<CalendarEvent | string> {
    const { startDate, endDate } = eventData;

    if (!allowOverlap) {
      // Check for event overlap with existing events
      const overlap = events.some((event) => {
        return startDate < event.endDate && endDate > event.startDate;
      });

      if (overlap) {
        return "Event overlaps with an existing event";
      }
    }

    const id = Math.random().toString(36).substring(7);
    const event: CalendarEvent = { id, ...eventData };
    events.push(event);
    return event;
  }

  // List eventns within a given date range
  async function listEventsInRange(
    startDate: Date,
    endDate: Date
  ): Promise<CalendarEvent[]> {
    return events.filter(
      (event) => event.startDate >= startDate && event.endDate <= endDate
    );
  }

  // Update event by ID
  async function updateEvent(
    id: string,
    eventData: Omit<CalendarEvent, "id">,
    allowOverlap = false
  ): Promise<CalendarEvent | string> {
    const existingEvent = events.find((event) => event.id === id);

    if (!existingEvent) {
      return "Event not found";
    }

    const { startDate, endDate } = eventData;

    if (!allowOverlap) {
      // Check for event overlap with existing events, excluding the event being updated
      const overlap = events.some((event) => {
        return (
          event.id !== id &&
          startDate < event.endDate &&
          endDate > event.startDate
        );
      });

      if (overlap) {
        return "Event overlaps with an existing event";
      }
    }

    // Update the event with the new data
    const updatedEvent: CalendarEvent = { ...existingEvent, ...eventData };
    const index = events.findIndex((event) => event.id === id);
    events[index] = updatedEvent;
    return updatedEvent;
  }

  // delete event by ID
  async function deleteEvent(id: string): Promise<object | undefined> {
    const index = events.findIndex((event) => event.id === id);

    if (index !== -1) {
      events.splice(index, 1);
      return { mesage: `Event with Id ${id} deleted Successfully!`, events };
    }
  }

  async function updateRecurringEventRule(
    eventId: string,
    newRule: RecurringEventRule
  ): Promise<CalendarEvent | undefined> {
    // Find the event by ID
    const eventToUpdate = events.find((event) => event.id === eventId);

    if (!eventToUpdate) {
      throw new Error(`Event with ID ${eventId} not found.`);
    }

    // Update the event's rule with the new rule
    eventToUpdate.recurringRule = newRule;

    return eventToUpdate;
  }

  return {
    createEvent,
    listEventsInRange,
    updateEvent,
    deleteEvent,
    updateRecurringEventRule,
  };
}

// Export the createCalendar function for use in other parts of your application
export { createCalendar, Calendar, CalendarEvent, RecurringEventRule };
