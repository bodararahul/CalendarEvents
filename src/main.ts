// main.ts
import {
  createCalendar,
  RecurringEventRule,
  CalendarEvent,
} from "./calendar/calendar";

async function main() {
  const calendar = createCalendar();

  // Create an event
  const event: any = await calendar.createEvent({
    title: "Event 1",
    startDate: new Date("2023-09-20T10:00:00"),
    endDate: new Date("2023-09-20T11:00:00"),
    recurringRule: {
      type: "daily",
      interval: 2,
      count: 5,
    },
  });

  console.log("Initial Event:", event);

  const eventIdToUpdate = event.id;

  // Define the new rule for the event
  const newRule: RecurringEventRule = {
    type: "weekly",
    interval: 2, // every 2 weeks
  };

  // Call the updateRecurringEventRule function
  try {
    const updatedEvent = await calendar.updateRecurringEventRule(
      eventIdToUpdate,
      newRule
    );
    console.log("Recurring event rule updated successfully.");
    console.log("updatedEvent -->>", updatedEvent);
  } catch (error: any) {
    console.error("Error updating recurring event rule:", error.message);
  }

  // Try to create an overlapping event
  const event2 = await calendar.createEvent(
    {
      title: "Event 2",
      startDate: new Date("2023-09-20T10:30:00"),
      endDate: new Date("2023-09-20T11:30:00"),
    },
    false // Explicitly disallow overlap
  );
  console.log("event2 -->>", event2); // Should return an error message

  // Create an overlapping event with explicit permission
  const event3 = await calendar.createEvent(
    {
      title: "Event 3", 
      startDate: new Date("2023-09-21T14:00:00"),
      endDate: new Date("2023-09-21T15:00:00"),
    },
    true // Allow overlap
  );
  console.log("event3 -->>", event3); // Should succeed

  // List events within a date range
  const startDate = new Date("2023-09-20T00:00:00");
  const endDate = new Date("2023-09-21T23:59:59");
  const eventsInRange = await calendar.listEventsInRange(startDate, endDate);

  console.log("eventsInRange -->>", eventsInRange);

  // Update the event without allowing overlaps
  const updatedEvent1 = await calendar.updateEvent(event.id, {
    title: "Updated Event 1",
    startDate: new Date("2023-09-20T11:30:00"),
    endDate: new Date("2023-09-20T12:30:00"),
  });
  console.log("Updated Event (1):", updatedEvent1); // Should return an error message

  // Update the event with explicit overlap permission
  const updatedEvent2 = await calendar.updateEvent(
    event.id,
    {
      title: "Updated Event 2",
      startDate: new Date("2023-09-20T11:30:00"),
      endDate: new Date("2023-09-20T12:30:00"),
    },
    true // Allow overlap
  );
  console.log("Updated Event (2):", updatedEvent2); // Should succeed

  //delete event by Id
  const eventIdTobeDeleted = eventsInRange[0].id;
  console.log("eventIdTobeDeleted -->>", eventIdTobeDeleted);
  console.log("eventsInRange -->>", eventsInRange);
  const result = await calendar.deleteEvent(eventIdTobeDeleted);
  console.log("result -->>", result);
}

main();
