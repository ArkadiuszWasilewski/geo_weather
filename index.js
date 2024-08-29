const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
require('dotenv').config();
const app = express();

app.listen(3000, ()=>{
    console.log("Listening at port 3000...");
})

app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (req, res)=>{
    database.find({}, (err, data)=>{
       
        if (err) {
            res.end();
            return;
        }
        res.json(data);
    })
})
app.post('/api', (req, res)=>{
    const data = req.body;
    console.log(data);
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    res.json(data);
})


app.get('/weather/:latlong', async (req, res)=>{
    console.log(req.params);
    const latlong = req.params.latlong.split(',');
    console.log(latlong);
    const lat = latlong[0];
    const long = latlong[1];
    console.log(lat, long);
    const apiKey = `${process.env.WEATHER_API_KEY}`;
    const api_url=`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${long}`;

    const response = await fetch(api_url);
    const jsondata = await response.json();
    res.json(jsondata);
})
