import { GraphQLServer } from 'graphql-yoga'

// Demo user data
const users = [{
  id: '1',
  name: 'User Name',
  email: 'a@gmail.com',
  age: 32
}, {
  id: '2',
  name: 'User Name 1',
  email: 'a1@gmail.com'
}, {
  id: '3',
  name: 'User Neme 2',
  email: 'a3@gmail.com'
}]

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    me: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }
`

// Resolvers
const resolvers = {
  Query:{
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users
      }
      
      return users.filter(u => {
        return u.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    me() {
      return {
        id: '123998',
        name: 'Albert',
        email: 'albert@example.com'
      }
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => console.log('The server is up!'))