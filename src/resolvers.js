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
    author: async (post, _, { db }) => {
      // This is the N+1 problem: called once per post
      return db.user.findUnique({ where: { id: post.authorId } });
    }
  },
  User: {
    posts: async (user, _, { db }) => {
      return db.post.findMany({ where: { authorId: user.id } });
    }
  }
};
