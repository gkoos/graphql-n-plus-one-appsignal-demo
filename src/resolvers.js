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
    author: async (post, _, { db }) => {
      // This is the N+1 problem: called once per post
      console.log(`🔄 Query: Fetching author for post ${post.id}`);
      return db.user.findUnique({ where: { id: post.authorId } });
    }
  },
  User: {
    posts: async (user, _, { db }) => {
      console.log(`🔄 Query: Fetching posts for user ${user.id}`);
      return db.post.findMany({ where: { authorId: user.id } });
    }
  }
};
