const User = {
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
}

export { User as default }