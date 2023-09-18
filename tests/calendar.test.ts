import {
  createCalendar,
  Calendar,
  CalendarEvent,
  RecurringEventRule,
} from "../src/calendar/calendar";

describe("Calendar Module", () => {
  let calendar: Calendar;

  beforeEach(() => {
    // Create a new calendar before each test
    calendar = createCalendar();
  });

  it("should create a new event", async () => {
    const eventData: Omit<CalendarEvent, "id"> = {
      title: "Test Event",
      startDate: new Date("2023-09-20T10:00:00"),
      endDate: new Date("2023-09-20T11:00:00"),
    };

    const event: any = await calendar.createEvent(eventData);

    expect(event).toHaveProperty("id");
    expect(event.title).toBe(eventData.title);
    expect(event.startDate).toEqual(eventData.startDate);
    expect(event.endDate).toEqual(eventData.endDate);
  });

  it("should create a new event with recurringRule", async () => {
    const eventData: Omit<CalendarEvent, "id"> = {
      title: "Recurring Event",
      startDate: new Date("2023-09-20T10:00:00"),
      endDate: new Date("2023-09-20T11:00:00"),
      recurringRule: {
        type: "daily",
        interval: 2,
        count: 5,
      },
    };

    const event: any = await calendar.createEvent(eventData);

    expect(event).toHaveProperty("id");
    expect(event.title).toBe(eventData.title);
    expect(event.startDate).toEqual(eventData.startDate);
    expect(event.endDate).toEqual(eventData.endDate);
    expect(event.recurringRule).toEqual(eventData.recurringRule);
  });

  it("should update the rule of a recurring event", async () => {
    // Create a recurring event with an initial rule
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

    // Mock the event ID for testing purposes
    const eventIdToUpdate = event.id;

    // Define the new rule for the event
    const newRule: RecurringEventRule = {
      type: "weekly",
      interval: 2,
    };

    // Call the updateRecurringEventRule function
    const updatedEvent: any = await calendar.updateRecurringEventRule(
      eventIdToUpdate,
      newRule
    );

    // Expect that the returned event has the updated rule
    expect(updatedEvent).toBeDefined();
    expect(updatedEvent?.recurringRule).toEqual(newRule);
  });

  it("should list events within a date range", async () => {
    const eventData1: Omit<CalendarEvent, "id"> = {
      title: "Event 1",
      startDate: new Date("2023-09-20T10:00:00"),
      endDate: new Date("2023-09-20T11:00:00"),
    };

    const eventData2: Omit<CalendarEvent, "id"> = {
      title: "Event 2",
      startDate: new Date("2023-09-20T12:00:00"),
      endDate: new Date("2023-09-20T13:00:00"),
    };

    await calendar.createEvent(eventData1);
    await calendar.createEvent(eventData2);

    const startDate = new Date("2023-09-20T00:00:00");
    const endDate = new Date("2023-09-20T23:59:59");
    const eventsInRange = await calendar.listEventsInRange(startDate, endDate);

    expect(eventsInRange).toHaveLength(2);
    expect(eventsInRange[0].title).toBe(eventData1.title);
    expect(eventsInRange[1].title).toBe(eventData2.title);
  });

  it("should update an event", async () => {
    const eventData: Omit<CalendarEvent, "id"> = {
      title: "Initial Event",
      startDate: new Date("2023-09-20T10:00:00"),
      endDate: new Date("2023-09-20T11:00:00"),
    };

    const updatedEventData: Omit<CalendarEvent, "id"> = {
      title: "Updated Event",
      startDate: new Date("2023-09-20T12:00:00"),
      endDate: new Date("2023-09-20T13:00:00"),
    };

    const event: any = await calendar.createEvent(eventData);
    const updatedEvent: any = await calendar.updateEvent(
      event.id,
      updatedEventData
    );

    expect(updatedEvent).toBeDefined();
    expect(updatedEvent.title).toBe(updatedEventData.title);
    expect(updatedEvent.startDate).toEqual(updatedEventData.startDate);
    expect(updatedEvent.endDate).toEqual(updatedEventData.endDate);
  });

  it("should delete an event", async () => {
    const eventData: Omit<CalendarEvent, "id"> = {
      title: "Event to Delete",
      startDate: new Date("2023-09-20T10:00:00"),
      endDate: new Date("2023-09-20T11:00:00"),
    };

    const event: any = await calendar.createEvent(eventData);

    const result = await calendar.deleteEvent(event.id);
    // const deletedEvent = await calendar.getEvent(event.id);

    // Check if the result is an object
    expect(typeof result).toBe("object");
  });
});
