import { GraphQLServer } from 'graphql-yoga'

// Type definitions (schema)
const typeDefs = `
  type Query {
    greeting(name: String): String!
    add(numbers: [Float!]!): Float!
    grades: [Int!]!
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
    grades(parent, args, ctx, info) {
      return [
        9,
        44,
        50
      ]
    },
    add(parent, args, ctx, info) {
      if (!args.numbers.length) {
        return 0
      }

     return args.numbers.reduce((acc, current) => acc + current)
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