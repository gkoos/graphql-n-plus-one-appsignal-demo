# GraphQL N+1 Demo

This repository demonstrates the **GraphQL N+1 query problem** using **Node.js**, **Express**, **Apollo Server**, and **Prisma** with a **SQLite** database.  

It also includes **AppSignal instrumentation** to help visualize the N+1 queries in a real backend trace.  

This is the **original, naive version** before applying batching or DataLoader.

---

## Features

- Express + Apollo Server GraphQL API
- Prisma ORM with SQLite (works on Windows, Linux, macOS)
- Example `Post` and `User` models
- Naive `Post.author` resolver causing N+1 queries
- AppSignal instrumentation for HTTP and database tracing
- Simple seed script to populate example data

---

## Installation

1. Clone the repo:

```bash
git clone https://github.com/gkoos/graphql-n-plus-one-demo.git
cd graphql-n-plus-one-demo
```

2. Install dependencies:

```bash
npm install
```

3. Generate the Prisma Client (required at least once after install or whenever the schema changes):

```bash
npx prisma generate
```

4. Initialize Prisma and create the SQLite database:

```bash
npm run prisma:migrate
npm run prisma:seed
```

5. Set environment variables:

Create a `.env` file in the project root with the following content (based on `.env.example`):

```
DATABASE_URL="file:./prisma/dev.db"
APPSIGNAL_PUSH_API_KEY=your-appsignal-push-api-key
```

## Running the Server

Start the server in development mode with hot reload:

```bash
npm run start
```

The server will be running at `http://localhost:4000/graphql`.

## Resetting the Database

To reset the database and reseed example data:

```bash
npm run reset-db
```

## Notes on SQLite

This demo uses SQLite via Prisma, which works on Windows, Linux, and macOS with zero setup — Prisma ships with its own SQLite engine, so readers don't need SQLite installed on their system.

## AppSignal Integration

AppSignal is pre-configured in this project. You need to set the `APPSIGNAL_PUSH_API_KEY` environment variable with your AppSignal push API key to enable tracing in `.env`.

The N+1 problem is visible in AppSignal traces as repeated identical SQL queries.

See your AppSignal dashboard for full trace insights.

## License
This project is licensed under the MIT License.
