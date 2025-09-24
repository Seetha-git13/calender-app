## Angular Calendar App

A full-stack calendar application with conflict detection and smart time suggestion, built with Angular 20 (standalone) and Node.js/Express.  
No external calendar plugins. Events are stored in `localStorage`.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.2.

---

## Features
Frontend(Angular 20)
- Monthly calendar view with date grid
- Create, edit, and delete events
- Event categories with color coding
- Navigate between months
- Data persistence with localStorage
- Built with Angular 20 standalone components

Backend (Node.js + Express)
- POST /check-conflicts — Check for overlapping events for participants
- POST /suggest-times — Suggest 3 alternative slots for conflicting events
- Conflict detection with buffer time (default: 15 min)
- Suggests time slots within working hours (9 AM–5 PM)
- JSON or in-memory event store (can be extended to use DB)
---

## Tech Stack

- Frontend -	Angular 20 (Standalone), SCSS
- Backend	-Node.js, Express
- Storage-LocalStorage (frontend), In-memory (backend)
- Testing	-Karma (Angular)

---

##  Setup Instructions(Frontend)
1. Clone the repo:
   ```bash
   git clone https://github.com/Seetha-git13/calendar-app.git
   cd calendar-app

## Folder Structure
calendar-app/
- frontend/     
- backend/       

## Install Dependencies
    ```bash
    cd frontEnd
    npm install
    ```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.
## Building

To build the project run:

```bash
ng build
```
This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

##  Setup Instructions(Backend)
## Install Dependencies
```bash
cd backend
npm install
```
## Development server

To start a local development server, run:

```bash
node server.js
```
## API Endpoints
1. POST /check-conflicts
    - Check if a proposed event overlaps existing events for any participant.


2. POST /suggest-times
    - Suggests 3 alternative times avoiding conflicts and outside buffer.


## Production Build & Deployment

You can deploy the frontend and backend separately or together via tools like:

    -Nginx reverse proxy
    -Docker (multi-stage builds)
    -Vercel + Render combo
    -Firebase (frontend) + Railway/Heroku (backend)

## Future Enhancements

    -Replace in-memory storage with MongoDB/PostgreSQL
    -Add user authentication
    -Extend time suggestion to span multiple days
    -Integration with Google Calendar


## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
