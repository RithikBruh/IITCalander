import api from "./api";

/*
{
  "summary": "bottesting",
  "start": { "dateTime": "2026-02-09T09:00:00+05:30", "timeZone": "Asia/Kolkata" },
  "end":   { "dateTime": "2026-02-09T10:00:00+05:30", "timeZone": "Asia/Kolkata" },
  "recurrence": [
    "RRULE:FREQ=WEEKLY;BYDAY=MO,TU;UNTIL=20260630T235900Z"
  ]
   "colorId": "5",
    "location": "IITB",
    "description": "This is a test event"
}

*/
export default async function setRemainder(
  { eventName, slot, seg, type, location },
  setStatus,
) {
  try {
    const settings = await import("../settings.json", {
      assert: { type: "json" },
    }).then((m) => m.default);
    const days = settings["slot-config"][slot];
    const segment = settings["segment-config"][seg];
    for (let day of days) {
       
      // starttime = ["09:00:09:55", "MO"]
      await api.post("/events", {
        summary: eventName,
        start: {
          dateTime: `${segment.startDate}T${day.starttime}:00+05:30`,
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: `${segment.startDate}T${day.endtime}:00+05:30`,
          timeZone: "Asia/Kolkata",
        },
        recurrence: [`RRULE:FREQ=WEEKLY;BYDAY=${day.day};UNTIL=${segment.endDate}T235900Z`],
        colorId: "9",
        location: location,
        description: `Type : ${type}`,
      });
    }
    setStatus(<h1 style={{ color: "green" }}>Remainder Set Successfully</h1>);
  } catch (e) {
    setStatus(<h1 style={{ color: "red" }}>Error : {e.message}</h1>);
  }
}
