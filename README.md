# Game Club

## Overview

A RESTful API that allows users to create game clubs and schedule events, along with a basic frontend to display clubs and their upcoming events.

## Tech Stack

- React on Vite with shadcn
- NestJS
- MongoDB

## Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/nooeen/game-club.git
   ```

2. Install the necessary applications:
   - Docker
   - Node.js (>=22.11.0) & pnpm (>=9.9.0)

3. Install the modules:

   ```bash
   pnpm install
   ```

4. Install application services (MongoDB) using Docker:

   ```bash
   pnpm run services
   ```

5. Create `.env` file for the API & edit if necessary (Current example env supports localhost):

   ```bash
   cp apps/api/.env.example apps/api/.env
   ```

6. Create `.env` file for the Frontend Web & edit if necessary (Current example env supports localhost):

   ```bash
   cp apps/web/.env.example apps/web/.env
   ```

7. Run the application modules:

   - In `/apps/api`:

     ```bash
     pnpm run start:dev
     ```

   - In `/apps/web`:

     ```bash
     pnpm run build
     pnpm run preview
     ```

8. Access the application:
   - Open the browser and navigate to `http://localhost:4173` (or any port displayed in the terminal) to view the frontend.
   - Open the browser and navigate to `http://localhost:3000/docs` (or any port specified in the `.env` file) to view the Swagger API documentation.

## Demo

A demo is setup for your convenience. The frontend is deployed to Cloudflare Pages and the backend is deployed to an on-premise server.

- Frontend: <https://gameclub.nvf.one>
- API Docs: <https://gameclub-api.nvf.one/docs>
