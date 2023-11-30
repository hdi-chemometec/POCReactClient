# Frontend for WebAPI project
This project contains the frontend for the Web API solution of the Xcyto project. 
The application connects to the backend via a websocket connection. The project handles incomming messages from the backend and sending messages to the backend.
From the received messages the application can show the user what options are available.

Technologies used in this project:
- React
- Tailwind for UI components
- JEST for unit testing

# Features
The project is still in it's startup phase. More features will be added later as the project's structure is done and is consistent.
The current features of the application are the following:
- Show if an instrument is connected by displaying the instrument's name
- Show the instrument's state(E.g. Idle, Busy) by colourcoding the name
- Show what protocols are currently available to the connected instrument
- Show what methods are currently available for a given protocol
- A user is able to choose a protocol from a dropdown list.
- When a protocol is chosen the method list is updated to show methods for that protocol
- A user is able to choose a method from a dropdownlist
- A user can click on the run button that runs the given protocol and method on the connected instrument

## Setup
When the project is setup for the first time, navigate to the following folder:
### Poc_web_frontend/webfrontendapptsx
and run following in the terminal:
### `npm install` 

## Start the project
Run the following in the terminal
### `npm start`
Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.

## Tests
No tests are available at the current time.
To run tests write the following 
### `npm test`

## Building the project for production
Run the following command in the terminal
### `npm run build`