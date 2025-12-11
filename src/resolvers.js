export const resolvers = {
  Query: {
    users: async (_, __, { db }) => {
      console.log('📍 Query: Fetching all users');
      return db.user.findMany();
    },
    posts: async (_, __, { db }) => {
      console.log('📍 Query: Fetching all posts');
      return db.post.findMany();
    }
  },
  Post: {
    author: async (post, _, { loaders }) => {
      // Using DataLoader to batch and cache user queries
      console.log(`✅ Loading author for post ${post.id} via DataLoader`);
      return loaders.userLoader.load(post.authorId);
    }
  },
  User: {
    posts: async (user, _, { db }) => {
      console.log(`🔄 Query: Fetching posts for user ${user.id}`);
      return db.post.findMany({ where: { authorId: user.id } });
    }
  }
};
