/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   17-08-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 19-08-2017
*/

import { TodoResolver } from "./todo.resolver";
import { UserResolver } from "./user.resolver";

const prepare = (o) => {
  o._id = o._id.toString()
  return o
}

export const resolvers = {
  Query: {
    // Todo
    todo:  (root, {_id}) => {
      return TodoResolver.single({ id: _id })
    },
    todos:  () => {
      return TodoResolver.index()
    },

    // User
    user:  (root,  args, context, info ) => {
      return UserResolver.single(context,{ id: args._id })
    },
    users:  () => {
      return UserResolver.index()
    },

    // Authentication
    auth: (root,  args, context, info ) => {
      return UserResolver.auth(args)
    },
    isAuth: (root,  args, context, info ) => {
      return UserResolver.isAuth(context)
    },
  },

  Mutation: {
    // Todo
    addTodo:  (root, args, context, info) => {
      return TodoResolver.create(args);
    },
    updateTodo:  (root, args, context, info) => {
      return TodoResolver.update(args);
    },
    deleteTodo:  (root, args, context, info) => {
      return TodoResolver.delete(args);
    },

    // User
    addUser: (root, args, context, info) => {
      return UserResolver.create(args);
    },
		updateUser: (root, args, context, info) => {
      return UserResolver.update(context, args);
    },
    deleteUser: (root, args, context, info) => {
      return UserResolver.delete(context, args);
    },
  },

}
