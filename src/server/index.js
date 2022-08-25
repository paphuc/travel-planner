var path = require("path");
const express = require("express");
let morgan = require('morgan');
const withQuery = require("with-query").default;
const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();
const usr = process.env.USR;
const weatherKey = process.env.WEATHER_KEY;
const picxaKey = process.env.PICXA_KEY;
const geoBaseURL = "http://api.geonames.org/postalCodeLookupJSON";
const forecastURL = "https://api.weatherbit.io/v2.0/forecast/daily";
const weatherBaseURL = "https://api.weatherbit.io/v2.0/current";
const pixaBaseURL = "https://pixabay.com/api/";

const cors = require("cors");

const app = express();
if(process.env.NODE_ENV !== 'test') {
  //use morgan to log at command line
  app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}
const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.static("dist"));

app.get("/", function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve("dist/index.html"));
});

// designates what port the app will listen to for incoming requests
module.exports = app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});

const getData = async (url = "", data = {}) => {
  const response = await fetch(withQuery(url, data));
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

// cout days
const countDays = (date_1, date_2) => {
  let diff = date_1.getTime() - date_2.getTime();
  return  Math.ceil(diff / (1000 * 3600 * 24));
};

app.get("/plan", async function (req, res) {
  // Get geo
  let geo = await getData(geoBaseURL, {
    placename: req.query.city,
    maxRows: 10,
    username: usr,
  });

  // Get temp
  let weatherURL = weatherBaseURL;
  let date_1 = new Date(req.query.departing);
  let date_2 = new Date();
  if ( countDays(date_1, date_2) > 7) {
    weatherURL = forecastURL;
  }
  let weather = await getData(weatherURL, {
    lat: geo["postalcodes"][0].lat,
    lon: geo["postalcodes"][0].lng,
    key: weatherKey,
  });

  // Get Image
  let img = await getData(pixaBaseURL, {
    key: picxaKey,
    q: "city+" + req.query.city,
    image_type: "photo",
  });

  res.send({
    placeImage: img["hits"][0].webformatURL,
    temp: weather["data"][0].temp,
    daysaway: countDays(date_1, date_2),
    weather: weather["data"][0].weather.description,
  });
});
