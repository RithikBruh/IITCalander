# IIT Calendar —> Google Calendar Automation 

## What it does

IIT Calendar converts **IIT course slot + segment information** into actual **Google Calendar events** automatically.

Instead of manually decoding timetable slots and adding classes one by one and checking segments , this tool generates correct class timings based on segment rules and creates events directly in Google Calendar.

---

## Why I built this

At IIT Hyderabad, class timings depend on **slot–segment combinations**, which makes it hard to directly create calendar events.

Manually adding classes to Google Calendar was repetitive and error-prone.
So I built this tool to **automate timetable conversion** and reduce manual effort.

This project also helped me practice **full-stack development** and integration with **Google APIs**.

---

## Tech Stack

Frontend:
- React

Backend:
- Node.js
- Express.js

Database:
- None

AI:
- Not used

Infra:
- Google Calendar API
- OAuth 2.0
- Raspberry Pi (self-hosted deployment)
- Tailscale (secure remote access)

---

## Architecture (important)

### Data Flow

```
User Input (Slot, Segment, Course Name)
            ↓
        React Frontend
            ↓
        Node.js Backend
            ↓
    Slot → Time Mapping Logic
            ↓
    Google Calendar API
            ↓
    Events Created in Calendar
```

### Explanation

1. User enters:

   * Slot (ex: A, B, C…)
   * Segment (ex: S1, S2…)
   * Course name

2. Frontend sends this data to the backend.

3. Backend:

   * Maps slot + segment → actual class timings
   * Generates calendar event details
   * Uses Google Calendar API to create events

4. Events appear automatically in the user's Google Calendar.

---

## Key Features

* 📌 Converts **slot + segment → real timetable**
* 📅 Automatically creates **Google Calendar events**
* 🔐 Google OAuth login support
* ⚡ Fast and eliminates manual calendar entry
* 🎯 Designed specifically for **IIT timetable structure**

---

## Challenges & Learnings ⭐

### What broke

* Google OAuth setup was initially confusing.
* Token generation flow failed multiple times.
* Calendar API permissions were misconfigured.

### What I fixed

* Implemented proper OAuth 2.0 flow.
* Created reusable slot-to-time mapping logic.
* Fixed token storage and refresh flow.

### Tradeoffs made

* Used static slot mappings instead of dynamic timetable parsing for simplicity.
* No database used to keep deployment simple.

---

## Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/iit-calendar.git
cd iit-calendar
```


### 2️⃣ Setup Backend

Create a Google Cloud app and enable:

* Google Calendar API
* OAuth 2.0

Create `.env` file inside backend:

```
CLIENT_ID=
SECRET_ID=
REDIRECT=http://localhost:3000/redirect
```


### 3️⃣ Generate Token

Run:

```bash
node auth.js
```

Then:

1. Open browser:

```
http://localhost:3000
```

2. Login using Google account
   (Make sure the account is added as **Test User**)

3. `tokens.json` will be generated.



### 4️⃣ Run Backend

```bash
node server.js
```



### 5️⃣ Run Frontend

```bash
npm start
```


## Demo

---

# ⭐ Improvements To be made (for future versions)

* Upload timetable PDF → auto-parse slots using AI
* Support different IIT timetable formats
* Make it avaliable to all by hosting it (needed googleOAuth verification)
