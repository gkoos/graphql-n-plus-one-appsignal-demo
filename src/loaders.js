import DataLoader from 'dataloader';

// Batch function to load multiple users by their IDs
async function batchLoadUsers(userIds, db) {
  // Fetch all users in a single query
  const users = await db.user.findMany({
    where: {
      id: { in: userIds }
    }
  });

  // Create a map for quick lookup
  const userMap = new Map();
  users.forEach(user => {
    userMap.set(user.id, user);
  });

  // Return users in the same order as requested IDs
  return userIds.map(id => userMap.get(id) || null);
}

// Factory function to create loaders for each request
export function createLoaders(db) {
  return {
    userLoader: new DataLoader((ids) => batchLoadUsers(ids, db))
  };
}
