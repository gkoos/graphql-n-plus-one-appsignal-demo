export const resolvers = {
  Query: {
    users: async (_, __, { db }) => {
      return db.user.findMany();
    },
    posts: async (_, __, { db }) => {
      return db.post.findMany();
    }
  },
  Post: {
    author: async (post, _, { loaders }) => {
      // Using DataLoader to batch and cache user queries
      return loaders.userLoader.load(post.authorId);
    }
  },
  User: {
    posts: async (user, _, { db }) => {
      return db.post.findMany({ where: { authorId: user.id } });
    }
  }
};
