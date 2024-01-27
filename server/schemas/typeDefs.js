const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]
  }
  
  type UserType {
    _id: ID
    username: String
  }
  
  type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }
  
  type Auth {
    token: String
    user: User
  }

  type Query {
    me: User!
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: BookInput): User
    removeBook(bookId: ID!): User
  }

  input BookInput {
    authors: [String!]!
    description: String!
    title: String!
    bookId: String!
    image: String!
    link: String
  }
  `;

module.exports = typeDefs;