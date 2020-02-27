const Query = {
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
}

export { Query as default }