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
  author: '1',
  post: '12'
}, {
  id: '101',
  text: 'Some random comment 1',
  author: '1',
  post: '12'
}, {
  id: '102',
  text: 'Some random comment 2',
  author: '1',
  post: '10'
}, {
  id: '103',
  text: 'Some random comment 3',
  author: '1',
  post: '11'
}]

const db = {
  users,
  posts,
  comments
}

export {db as default}