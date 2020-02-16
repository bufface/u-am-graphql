import { GraphQLServer } from 'graphql-yoga'

// Demo user data
const users = [{
  id: '1',
  name: 'Cristian',
  email: 'andrew@example.com',
  age: 27
}, {
  id: '2',
  name: 'Sarah',
  email: 'sarah@example.com'
}, {
  id: '3',
  name: 'Mike',
  email: 'mike@example.com'
}]

const posts = [{
  id: '10',
  title: 'GraphQL 101',
  body: 'This is how to use GraphQL...',
  published: true,
  author: '1'
}, {
  id: '11',
  title: 'GraphQL 201',
  body: 'This is an advanced GraphQL post...',
  published: false,
  author: '1'
}, {
  id: '12',
  title: 'Programming Music',
  body: '',
  published: false,
  author: '2'
}]

const comments = [{
  id: '100',
  text: 'Some random comment',
  author: '1'
}, {
  id: '101',
  text: 'Some random comment 1',
  author: '1'
}, {
  id: '102',
  text: 'Some random comment 2',
  author: '1'
}, {
  id: '103',
  text: 'Some random comment 3',
  author: '1'
}]

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int,
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
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
    posts(parent, args, ctx, info) {
      if (!args.query) {
          return posts
      }

      return posts.filter((post) => {
          const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
          const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
          return isTitleMatch || isBodyMatch
      })
    },
    comments() {
      return comments
    },
    me() {
      return {
        id: '123998',
        name: 'Albert',
        email: 'albert@example.com'
      }
    },
    post() {
      return {
          id: '092',
          title: 'GraphQL 101',
          body: '',
          published: false
      }
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(u => {
        return u.id === parent.author
      })
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(p => {
        return p.author === parent.id
      })
    },
    comments(parent, args, ctx, info) {
      return comments.filter(c => {
        return c.author === parent.id
      })
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(u => {
        return u.id === parent.author
      })
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => console.log('The server is up!'))