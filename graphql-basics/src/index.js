import { GraphQLServer } from 'graphql-yoga'

// Type definitions (schema)
const typeDefs = `
  type Query {
    id: ID!
    name: String!
    age: Int!
    emplyed: Boolean!
    gpa: Float
  }
`

// Resolvers
const resolvers = {
  Query:{
    id() {
      return 'abc123'
    },
    name() {
      return 'Cristian Buffa'
    },
    age() {
      return 32
    },
    emplyed() {
      return true
    },
    gpa() {
      return 3.10
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => console.log('The server is up!'))