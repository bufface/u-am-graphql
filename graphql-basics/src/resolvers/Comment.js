const Comment = {
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

export { Comment as default }