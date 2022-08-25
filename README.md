# Project Instructions
## Getting started

`cd` into your new folder and run:
- `npm install`

## Setting up the API
### Step 1: Signup for an API key
- Create an account with Geonames: [here](http://www.geonames.org/export/web-services.html) 
- Create an account with Weatherbit: [here](https://www.weatherbit.io/account/create)
- Create an account with Pixabay: [here](https://pixabay.com/api/docs/)
### Step 2: Environment Variables
Next we need to declare our API keys, which will look something like this:
```
// set meaningcloud API credentias
const usr = process.env.USR;
const weatherKey = process.env.WEATHER_KEY;
const picxaKey = process.env.PICXA_KEY;
```
...but there's a problem with this. We are about to put our personal API keys into a file, but when we push, this file is going to be available PUBLICLY on Github. Private keys, visible publicly are never a good thing. So, we have to figure out a way to make that not happen. The way we will do that is with environment variables. Environment variables are pretty much like normal variables in that they have a name and hold a value, but these variables only belong to your system and won't be visible when you push to a different environment like Github.

- [ ] Use npm or yarn to install the dotenv package ```npm install dotenv```. This will allow us to use environment variables we set in a new file
- [ ] Create a new ```.env``` file in the root of your project
- [ ] Go to your .gitignore file and add ```.env``` - this will make sure that we don't push our environment variables to Github! If you forget this step, all of the work we did to protect our API keys was pointless.
- [ ] Fill the .env file with your API keys like this:
```
PICXA_KEY=**************************
WEATHER_KEY=**************************
USR=**************************

```
- [ ] Add this code to the very top of your server/index.js file:
```
const dotenv = require('dotenv');
dotenv.config();
```
- [ ] Reference variables you created in the .env file by putting ```process.env``` in front of it, an example might look like this:
```
console.log(`Your API key is ${process.env.API_KEY}`);
```
...Not that you would want to do that. This means that our updated API credential settings will look like this:
```javascript
// set meaning cloud API credentials
const usr = process.env.USR;
const weatherKey = process.env.WEATHER_KEY;
const picxaKey = process.env.PICXA_KEY;
```

## Run project in local

``` npm run build-dev```
``` npm run start```

## Run unit test
``` npm run test```

## Deploying

A great step to take with your finished project would be to deploy it! Unfortunately its a bit out of scope for me to explain too much about how to do that here, but checkout [Netlify](https://www.netlify.com/) or [Heroku](https://www.heroku.com/) for some really intuitive free hosting options.
