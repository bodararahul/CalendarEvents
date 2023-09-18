# Calendar Events Library

The Calendar Events Library is a TypeScript-based library that allows you to manage calendar events. You can create, retrieve, update, and delete events in a calendar, with support for checking event overlaps and more.

## Installation

To use this library, you need to have Node.js and npm (Node Package Manager) installed on your system. Follow these steps to get started:

## Clone the repository to your local machine:

```bash
Copy code
git clone https://github.com/bodararahul/CalendarEvents.git
Navigate to the project directory:

bash
Copy code
cd CalendarEvents
Install the library's dependencies:

bash
Copy code
npm install

compile code 
tsc

run code
node dist/main.js
```

# API Reference
## Calendar Methods

```createEvent(eventData: Omit<CalendarEvent, 'id'>, allowOverlap?: boolean): Promise<CalendarEvent | string>```: 
Creates a new calendar event. Optionally, you can allow event overlaps by setting allowOverlap to true. Returns the created event or an error message.

```getEvent(id: string): Promise<CalendarEvent | undefined>```: 
Retrieves an event by its ID. Returns the event or undefined if not found.

```listEventsInRange(startDate: Date, endDate: Date): Promise<CalendarEvent[]> ```: 
Lists all events within a specified date range.

```updateEvent(id: string, eventData: Omit<CalendarEvent, 'id'>, allowOverlap?: boolean): Promise<CalendarEvent | string>```: 
Updates an event by its ID. Optionally, you can allow event overlaps by setting allowOverlap to true. Returns the updated event or an error message.

```deleteEventById(id: string): Promise<void | string>```: 
Deletes an event by its ID. Returns void if the event is deleted successfully or an error message if the event is not found.

# Third-Party References
This library does not currently rely on any third-party dependencies. However, it is built using TypeScript, Node.js, and npm.

# License
This project is licensed under the MIT License.