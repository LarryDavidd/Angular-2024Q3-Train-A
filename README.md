# Train-A

### Deployment: https://deploy-preview-14--angular-2024q3-train-a.netlify.app

## General

Welcome to our Train-A app.

The main purpose of our application is to provide users with the ability to search and purchase a ticket for a railroad trip. Our application provides a user-friendly interface to make it as comfortable as possible for the user to make purchases.

The application also provides an admin panel. Here you can create and edit stations, types of wagons, routes and route schedules.

An important aspect of our app is that it is responsive so that it looks great on various devices with a minimum resolution of 390 pixels. This feature makes shopping enjoyable, no matter which device the user prefers.

## Technical Stack 💻

- Frontend:
  - Angular – A robust and versatile framework for building dynamic web applications
  - TypeScript – A typed superset of JavaScript that enhances development with better tooling and scalability
  - AngularMaterials – A collection of rich UI components for Angular, enabling faster and visually appealing interfaces
  - tailwind – A CSS preprocessor that provides powerful features for cleaner, more manageable styling
- Backend:
  - @planess/train-a-backend – The core API that powers the server-side of the application
- CI/CD:
  - GitHub Actions – Automates the continuous integration process for streamlined development workflows
  - Netlify – Ensures fast and seamless deployment, simplifying the hosting and management of the application
- Code Quality:
  - Husky – A tool that helps enforce consistent commit practices, running linters and tests automatically
  - Prettier – Automatically formats code to maintain a uniform style
  - ESLint – Linting tools for JavaScript and CSS, ensuring clean and error-free code

## Available Scripts 📑

- `npm run start`: Running the application.
- `npm run format`: Applies code formatting using Prettier.
- `npm run ci:format`: Checks code formatting compliance using Prettier.
- `npm run lint`: Lints the codebase using ESLint.
- `npm run lint:fix`: Fixes linting errors automatically using ESLint for TypeScript files.
- `npm run prepare`: Sets up Husky for managing git hooks.
- `npm run test`: Runs tests using Jest.

## Setup and Running

1. Clone this repository to your local compute
2. Navigate to the project directory
3. Install dependencies: npm install
4. Run the project: npm run start
