# Solve GraphQL N+1 queries using AppSignal

## Introduction

GraphQL makes it easy to shape exactly the data you need, but performance can quickly degrade if you're not careful with how related data is fetched. It is easy to trigger the *N+1 problem*: when a resolver for a related field issues one database query per parent record, a single request can explode into dozens of queries. That means extra latency, wasted database I/O, and noisy traces in production.

In this guide, we'll reproduce the N+1 problem on a simple Node stack (Express 4, Apollo Server 5, Prisma + SQLite) and instrument it with AppSignal. You'll see how the naive resolver shows up as a pile of identical Prisma spans in the AppSignal performance view, then how adding a small DataLoader completely collapses those queries into a single batched call. Along the way, you'll get the exact code changes, what to look for in AppSignal before vs. after, and a couple of guardrails to keep future N+1 issues in check.

You need just a few basics to follow along: a working Node/npm setup, an AppSignal account with a Push API key, and the ability to run npm install and npx prisma generate in this project. If you're comfortable reading simple Apollo/Express code and have a basic understanding of GraphQL, you're set - the rest is explained as we go.

## What We Will Build

We'll start with a simple GraphQL API exposing `User` and `Post` types, where each post has an author (a user). The naive resolver for `Post.author` will issue a separate database query for each post when fetching its author, leading to the N+1 problem. We'll instrument the server with AppSignal to visualize the problem in the performance traces. Then, we'll implement batching using DataLoader to fix the N+1 issue, and observe the improved performance in AppSignal.

The code is available in this [GitHub repository](https://github.com/gkoos/graphql-n-plus-one-appsignal-demo/). The `main` branch contains the naive implementation with the N+1 problem, while the `dataloader` branch includes the DataLoader fix.

## Setting Up the Project

Clone the repo and install the dependencies:

```bash
git clone https://github.com/gkoos/graphql-n-plus-one-appsignal-demo.git
cd graphql-n-plus-one-appsignal-demo
npm install
```

Then generate the Prisma client and set up the database:

```bash
npx prisma generate
npm run prisma:migrate
npm run prisma:seed
```

Create a `.env` file in the project root with the db url andyour AppSignal Push API key:

```
DATABASE_URL="file:./prisma/dev.db"
APPSIGNAL_PUSH_API_KEY=your-appsignal-push-api-key
```

You can now run the server:

```bash
npm start
```

The server runs on port 4000. You can access the GraphQL Playground at `http://localhost:4000/graphql` to run queries.

## 