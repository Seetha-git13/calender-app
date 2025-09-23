## Angular Calendar App

A simple calendar application with event management, built using Angular 20 (standalone components).  
No external calendar plugins. Events are stored in `localStorage`.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.2.

---

## Features
- Monthly calendar view with date grid
- Create, edit, and delete events
- Event categories with color coding
- Navigate between months
- Data persistence with localStorage
- Built with Angular 20 standalone components

---

## Tech Stack
- Angular 20 (standalone)
- TypeScript
- RxJS (BehaviorSubject for state)
- SCSS for styling

---

##  Setup Instructions
1. Clone the repo:
   ```bash
   git clone https://github.com/Seetha-git13/calendar-app.git
   cd calendar-app

## Install Dependencies
    ```bash
    npm install
    ```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

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

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
