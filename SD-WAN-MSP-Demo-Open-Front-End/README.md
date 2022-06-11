# SD-WAN MSP Dashboard Demo Front End

React web application front end for integration with MSP Single Tenant SD-WAN REST API.

## Prerequisites

1. Make sure you have the latest Stable or LTS version of Node.js installed by running `node -v` and `npm -v` - if not, you can run `brew install node` with Homebrew.

## Connecting to Back End

1. Follow the back end instructions so it is running in the background.
2. Change `API_SERVER` in config/env/dev.json to the URL the back end is running on (e.g. `http://localhost:8080`).

## Running The Dashboard

1. Navigate to the dashboard root directory.
2. Run `npm i` to install dependencies.
3. Run `npm start` to spin up the front end app.
4. Open [http://localhost:8081](http://localhost:8081) to see the dashboard in action.