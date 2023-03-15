//This is the minimal express server. 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const db = require('../server/db/db-connection.js'); 

const app = express();
const PORT = 8080;

// Configuring cors middleware
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// //creates an endpoint for the route `/`
app.get("/", (req, res) => {
    res.json("Hello Techtonica Server for an app with Events");
  });

//Get all events
app.get('/api/events', async (req, res) =>{

    //real connection with the DB eventonica
    try{
        const { rows: events } = await db.query('SELECT * FROM events');
        res.send(events);

    } catch(error){
        console.log(error);
        return res.status(400).json({error});

    }

    //hardcode the events response for testing reasons. This call has one more event that the real DB 
    // const events = [

    //     {id: 1, eventname: 'Women in Tech Techtonica Panel', location: 'Overland Park Convention Center', isfavorite: false, category: Tech},
    //     {id: 2, eventname: 'Japanese Cultural Education', location: 'Seattle Convention Center', isfavorite: false, category: Culture},
    //     {id: 3, eventname: "Haven 90's Party Night Club", location: 'Hilton Hotel Kansas City', isfavorite: false, category: Celebrate},
    //     {id: 4, eventname: 'Comedy Night at the Station', location: 'SF Hilton Hotel', isfavorite: false, category: Entertainment},
    //     {id: 5, eventname: 'A Decadent Arts Experience', location: 'West Ridge Mall', isfavorite: false, category: Art/Museum},
    //     {id: 6, eventname: 'Techtonica Classroom Course', location: 'Techtonica HQ', isfavorite: false, category: Course}
    //   ];
    // res.json(events);
})

//Create a route for the POST
//Create new event
app.post("/api/events", async (req, res) => {
    //At the end --> save this event to the db
    // console.log(req.body)
    try {
        const newEvent = {
            eventname: req.body.eventname,
            location: req.body.location,
            eventdate: req.body.eventdate,
            category: req.body.category
        }

        const result = await db.query('INSERT INTO events(eventname, location, eventdate, category) VALUES ($1, $2, $3, $4) RETURNING *', [newEvent.eventname, newEvent.location, newEvent.eventdate, newEvent.category]);
        let response = result.rows[0];
        console.log(response)
        res.json(response)
    } catch (e) {
        console.log(error)
        return res.status(400).json({error})
    }
})

// Get one event
app.get('/api/events/:id', async (req, res) =>{

    //real connection with the DB eventonica
    try{
        const { id } =req.params;
        const event = await db.query('SELECT * FROM events WHERE id = $1', [id]);
        console.log(event.rows[0])
        res.json(event.rows[0]);

    } catch(error){
        console.log(error);
        return res.status(400).json({error});

    }
})
//Update event

//Delete event



app.listen(PORT, () => console.log(`Hola! Server running on Port http://localhost:${PORT}`));