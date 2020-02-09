import { GraphQLServer } from 'graphql-yoga'

// Type definitions (schema)
const typeDefs = `
  type Query {
    greeting(name: String): String!
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
    greeting(parent, args, ctx, info) {
      if (args.name) {
        return `Hello ${args.name}`
      } else {
        return 'Hello!'
      }
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