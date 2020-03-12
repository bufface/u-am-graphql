import uuidv4 from 'uuid/v4'

const Mutation = {
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
  updateUser(parent, args, ctx, info) {
    const { id, data } = args
    const user = ctx.db.users.find(u => u.id === id)

    if (!user) {
      throw new Error('User not found')
    }

    if (typeof data.email === 'string') {
      const emailTaken = ctx.db.users.some(u => u.email === data.email)

      if (emailTaken) {
        throw new Error('Email taken')
      }

      user.email = data.email
    }

    if (typeof data.name === 'string') {
      user.name = data.name
    }

    if (typeof data.age !== 'undefined') {
      user.age = data.age
    }

    return user
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
}

export { Mutation as default }