/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   17-08-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 18-08-2017
*/

export const typeDefs = [`

  type Todo {
    _id: String
    description: String
    isComplete: Boolean
    deadline: String
    expire: Boolean
  }

  type User {
    _id: String
    email: String
    admin: Boolean
    created: String
  }

  type Auth {
    user: User
    token: String
  }

  type Status {
    status:Boolean,
    _id:String
  }

  type Query {
    todo(_id: String): Todo
    todos: [Todo]

    user(_id: String): User
    users: [User]

    auth(email: String!, password: String!): Auth
    isAuth: User
  }

  type Mutation {
    addTodo(description: String, deadline: String): Todo
    updateTodo(_id: String!, description: String, isComplete: Boolean, deadline: String, expire: Boolean): Todo
    deleteTodo(_id: String!): Status

    addUser(email: String!, password: String!): User
    updateUser(_id: String!, admin: Boolean): User
    deleteUser(_id: String!): Status
  }

  schema {
    query: Query
    mutation: Mutation
  }
  `]
