require('dotenv').config();

const express = require('express');
const fs = require('fs');
const { google } = require('googleapis');

const app = express();
app.use(express.json());
const cors = require("cors")

// Load allowed origins from settings.json
const settings = JSON.parse(fs.readFileSync('./settings.json', 'utf8'));
const allowedOrigins = settings.allowOrigins || [];

app.use(cors({
	origin: allowedOrigins,
	credentials: true
}))
const oauth2Client = new google.auth.OAuth2(
	process.env.CLIENT_ID,
	process.env.SECRET_ID,
	process.env.REDIRECT
);

const tokenPath = 'tokens.json';
if (fs.existsSync(tokenPath)) {
	const saved = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
	oauth2Client.setCredentials(saved);
}

app.get('/', (req, res) => {
	const url = oauth2Client.generateAuthUrl({
		access_type: 'offline',
		prompt: 'consent',
		scope: 'https://www.googleapis.com/auth/calendar'
	});
	res.redirect(url);
});

app.get('/redirect', (req, res) => {
	const code = req.query.code;
	oauth2Client.getToken(code, (err, tokens) => {
		if (err) {
			console.error('Could not get token', err);
			res.status(500).send('Error');
			return;
		}
		oauth2Client.setCredentials(tokens);
		fs.writeFileSync(tokenPath, JSON.stringify(tokens, null, 2));
		res.send('Successfully logged in');
	});
	
});

app.get('/calendars', (req, res) => {
	const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
	calendar.calendarList.list({}, (err, response) => {
		if (err) {
			console.error('Error fetching calendars', err);
			res.status(500).send('Error');
			return;
		}
		res.json(response.data.items || []);
	});
});

app.get('/events', (req, res) => {
	const calendarId = req.query.calendar ?? 'primary';
	const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
	calendar.events.list({
		calendarId,
		timeMin: new Date().toISOString(),
		maxResults: 30,
		singleEvents: true,
		orderBy: 'startTime'
	}, (err, response) => {
		if (err) {
			console.error('Can\'t fetch events', err);
			res.status(500).send('Error');
			return;
		}
		res.json(response.data.items || []);
	});
});

app.post('/events', async (req, res) => {
	const calendarId = req.query.calendar ?? 'primary';
	const event = req.body;

	console.log("Body : ",req.body)
	if (!event?.summary || !event?.start || !event?.end) {
		res.status(400).json({
			error: 'Missing required fields: summary, start, end'
		});
		return;
	}

	try {
		const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
		const response = await calendar.events.insert({
			calendarId,
			requestBody: event
		});
		res.json(response.data);
	} catch (err) {
		console.error('Can\'t create event', err);
		res.status(500).send('Error');
	}
});

app.delete('/events/:eventId', async (req, res) => {
    console.log("dleeted triggerd")
	const calendarId = req.query.calendar ?? 'primary';
	const eventId = req.params.eventId;

	if (!eventId) {
		res.status(400).json({ error: 'Missing eventId' });
		return;
	}

	try {
		const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
		await calendar.events.delete({ calendarId, eventId });
		res.json({ ok: true });
	} catch (err) {
		console.error('Can\'t delete event', err);
		res.status(500).send('Error');
	}
});

app.listen(3000, () => console.log('Server running at 3000'));