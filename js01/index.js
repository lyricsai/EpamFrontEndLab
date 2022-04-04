"use strict";
const fetch = require("node-fetch");
const express = require("express");
const router = express.Router();

const app = express();
const PORT = 3001;

const weatherAPI = `https://fcc-weather-api.glitch.me/api/current?`;

const coords = [
    { city: "brest", lat: 52.097, lon: 23.734 },
    { city: "gomel", lat: 52.435, lon: 30.975 },
    { city: "grodno", lat: 53.669, lon: 23.813 },
    { city: "minsk", lat: 53.89, lon: 27.5674 },
    { city: "mogilev", lat: 53.900, lon: 30.331 },
    { city: "vitebsk", lat: 55.187, lon: 30.205 }
];

//html navigation
let htmlInitial = '<h1>Current Weather</h1><nav><ul style="display:flex; justify-content:space-evenly;">';
for (let i = 0; i < coords.length; i++) {
    htmlInitial += `<li><a href="${coords[i].city}">${coords[i].city.toUpperCase()}</a></li>`;
}
htmlInitial += '</ul></nav>';

app.get('/', (req, res) => {
    res.send(htmlInitial);
});

app.use('/', router);

router.get(`/:city`, async (req, res) => {

    const city = req.params.city;
    const latitude = coords.filter(item => item.city === city)[0]?.lat;
    const longitude = coords.filter(item => item.city === city)[0]?.lon;

    const response = await fetch(weatherAPI + `lat=${latitude}&lon=${longitude}`);
    const data = await response.json();

    let html = htmlInitial;

    //element navigation
    html += `<div style="display:flex; justify-content:center; align-items:center; flex-direction:column">
                <h2>${city[0].toUpperCase() + city.slice(1)}</h2>
                <p>${data.weather[0].main}</p>
                <img src=${data.weather[0].icon} alt="weather"/>
                <p>Temperature: ${data.main.temp.toFixed(1)}℃</p>
                </div>`;
    res.send(html);

});

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}!`);
});
