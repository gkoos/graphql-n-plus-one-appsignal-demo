export const typeDefs = `
  type User {
    id: Int!
    name: String!
    posts: [Post!]!
  }

  type Post {
    id: Int!
    title: String!
    author: User!
  }

  type Query {
    users: [User!]!
    posts: [Post!]!
  }
`;
