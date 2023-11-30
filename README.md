<!-- TOC -->

- [Introduction](#introduction)
  - [Features](#features)
- [Getting started](#getting-started)
  - [Clone repo](#clone-repo)
  - [Installing dependencies](#installing-dependencies)
  - [Build and run](#build-and-run)
- [Design](#design)
  - [Tailwind](#tailwind)
- [Code](#code)
  - [Tech stack](#tech-stack)

<!-- /TOC -->

# Introduction
This project contains the frontend for the Web API solution of the Xcyto project. 
The application connects to the Node server via a websocket connection. The project handles incoming messages from the backend and sending messages to the backend.
From the received messages the application can show the user what options are available.

Technologies used in this project:
- React
- Tailwind for UI components
- JEST for unit testing

## Features
The project is still in it's startup phase. More features will be added later as the project's structure is done and is consistent.
The current features of the application are the following:
- Show if an instrument is connected  by displaying a text telling the user if it is connected or not
- Show the instrument's state(E.g. Idle, Busy) by colour coding the state
- Show if an instrument is connected by displaying a text telling the user if it is connected or not
- Show the robot's state(E.g. Idle, Busy) by colour coding the state
- Show what protocols are currently available to the connected robot
- A user is able to choose a protocol from a dropdown list.
- A user can click on the create button that creates a chosen protocol
- A user can click on the run button that runs the given protocol when a run has been created

# Getting started
Make sure you have the following installed:

- Node.js
- Git
- Visual Studio Code
- Chrome
- Powershell (You can use the one embedded in VS Code)

## Clone repo
Start by cloning the repo. This can be done with the following command in the terminal:
`git clone https://github.com/hdi-chemometec/POCReactClient.git`

## Installing dependencies
Before the application can be run you will need to install it's dependencies. This can be done with the following command in the terminal:
`npm install`

## Build and run

**Run server**
There's a number of scripts that can be used to build and test the applications. These scripts can be found in the package.json file in the root folder of the project. The most important scripts are listed below:

**Run server**
This will start the server:
`npm start`

The server can be accessed at : `http://127.0.0.1:8083`

# Design
## Tailwind

The primary tool used for styling is Tailwind. For further information see: https://tailwindcss.com/
More advanced components which is difficult to make or style can be found in the Material Tailwind library. For further information see: https://material-tailwind.com/
Only use this library if you can't find a component in the shared library or if you can't style the component using Tailwind.

# Code

## Tech stack

We are using React as our frontend framework. This means that we are building our applications by composing components from the Shared component library. The components are built using TypeScript and styled using Tailwind. 
The primary tech stack is as follows:

- React - components
- Node.js - server
- TypeScript - language
- Tailwind - styling