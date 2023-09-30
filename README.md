# All libraries and technologies used in the project 

Movie app full stack (MERN Stack) using React, Redux, MUI5, MongoDauBuoi, ...

## Tech

App uses a number of open source projects to work properly:

- [node.js] - For the backend
- [Express] - Fast node.js network app framework
- [ReactJS] - Frontend Framework
- [ReduxToolkit] - State Management
- [MaterialUI] - Build UI
- [MongoDB] - Database saving
- [Yup/Fomik] - Validate form

## Features

- Import a HTML file and watch it magically convert to Markdown
- Drag and drop images (requires your Dropbox account be linked)
- Import and save files from GitHub, Dropbox, Google Drive and One Drive
- Drag and drop markdown and HTML files into Dillinger
- Export documents as Markdown, HTML and PDF

## Installation & Run App

### Create & change environment variables from .env file

```sh
MONGODB_URL = 
PORT = 
TOKEN_SECRET = randomsecret
TMDB_BASE_URL = https://api.themoviedb.org/3/
TMDB_KEY = 
```

MovieApp requires install [Node.js](https://nodejs.org/) to run ( >= ver 18).

### Server
```sh
cd dillinger
npm i
npm start
```

### Client
```sh
cd client
npm i
npm run dev
```