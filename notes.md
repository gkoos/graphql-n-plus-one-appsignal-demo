This demo uses SQLite via Prisma, which works on Windows, Linux, and macOS with zero setup — Prisma ships with its own SQLite engine, so readers don’t need SQLite installed on their system.

Express5 AppSignal3 integration doesn't seem to work at time of writing, so this demo uses Express4 integration instead.

main branch: naive implementation with N+1 query problem
dataloader branch: optimized implementation using DataLoader to batch and cache requests

1. install DataLoader
```bash
npm install dataloader
```

2. Create a user loader (src/loaders.js)
Create a new file that defines a DataLoader for batching user queries:

Takes an array of user IDs
Fetches all users in one query: db.user.findMany({ where: { id: { in: ids } } })
Returns results in the same order as requested IDs
DataLoader handles batching and caching automatically

3. Add loaders to GraphQL context (context.js)

4. Update Post.author resolver (resolvers.js)


Each request gets fresh loader instances (important for caching scope).