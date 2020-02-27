import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'

import db from './db'

// Resolvers
const resolvers = {
  Query:{
    users(parent, args, ctx, info) {
      if (!args.query) {
        return ctx.db.users
      }
      
      return ctx.db.users.filter(u => {
        return u.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
          return ctx.db.posts
      }

      return ctx.db.posts.filter((post) => {
          const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
          const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
          return isTitleMatch || isBodyMatch
      })
    },
    comments(parent, args, ctx, info) {
      return ctx.db.comments
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
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = ctx.db.users.some(u => u.email === args.data.email)
      
      if (emailTaken) {
        throw new Error('Email taken.')
      }

      const user = {
        id: uuidv4(),
        ...args.data
      }

      ctx.db.users.push(user)

      return ctx.db.user
    },
    deletePost(parent, args, ctx, info) {
      const postIndex = ctx.db.posts.findIndex(p => p.id === args.id)

      if (postIndex === -1) {
        throw new Error('Post not found.')
      }

      const deletedPosts = ctx.db.posts.splice(postIndex, 1)

      ctx.db.comments = ctx.db.comments.filter(c => c.post !== args.id)

      return deletedPosts[0]
    },
    deleteUser(parent, args, ctx, info) {
      const userIndex = ctx.db.users.findIndex(u => u.id === args.id)

      if (userIndex === -1) {
        throw new Error('User not found.')
      }

      const deletedUsers = ctx.db.users.splice(userIndex, 1)

      ctx.db.posts = ctx.db.posts.filter(p => {
        const match = p.author === args.id

        if (match) {
          ctx.db.comments = ctx.db.comments.filter(c => c.post !== post.id)
        }

        return !match
      })

      ctx.db.comments = ctx.db.comments.filter(c => c.author !== args.id)

      return deletedUsers[0]
    },
    deleteComment(parent, args, ctx, info) {
        const commentIndex = ctx.db.comments.findIndex((comment) => comment.id === args.id)

        if (commentIndex === -1) {
            throw new Error('Comment not found')
        }

        const deletedComments = comments.splice(commentIndex, 1)

        return deletedComments[0]
    },
    createPost(parent, args, ctx, info) {
      const userExist = ctx.db.users.some(u => u.id === args.data.author)

      if (!userExist) {
        throw new Error('User not found.')
      }

      const post = {
        id: uuidv4(),
        ...args.data
      }

      ctx.db.posts.push(post)

      return post
    },
    createComment(parent, args, ctx, info) {
      const userExist = ctx.db.users.some(u => u.id === args.data.author)
      const postExist = ctx.db.posts.some(p => p.id === args.data.post && p.published)

      if (!userExist || !postExist) {
        throw new Error('Unable to find user and post.')
      }

      const comment = {
        id: uuidv4(),
        ...args.data
      }

      ctx.db.comments.push(comment)

      return comment
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return ctx.db.users.find(u => {
        return u.id === parent.author
      })
    },
    comments(parent, args, ctx, info) {
      return ctx.db.comments.filter(c => {
        return c.post === parent.id
      })
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return ctx.db.posts.filter(p => {
        return p.author === parent.id
      })
    },
    comments(parent, args, ctx, info) {
      return ctx.db.comments.filter(c => {
        return c.author === parent.id
      })
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return ctx.db.users.find(u => {
        return u.id === parent.author
      })
    },
    post(parent, args, ctx, info) {
      return ctx.db.posts.find(p => {
        return p.id === parent.post
      })
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db
  }
})

server.start(() => console.log('The server is up!'))