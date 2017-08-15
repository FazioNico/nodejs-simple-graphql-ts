/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-08-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 15-08-2017
*/

import { GraphQLObjectType, GraphQLSchema } from 'graphql';
// import the query file
//import { UserQuery } from './queries/user.queries'
import { TodoQuery } from './queries/todo.queries'
// import the mutation file
// import { UserMutation } from "./mutations/user.mutation";
// import { TodoMutation } from "./mutations/todo.mutation";

// define root query
const RootQuery:GraphQLObjectType = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'This is the default root query provided by the backend',
  fields: {
    // 	users: UserQuery.index(),
    // 	user: UserQuery.single(),
    todos: TodoQuery.index(),
    todo: TodoQuery.single(),
  },
});

// // define root mutation
// const RootMutation:GraphQLObjectType = new GraphQLObjectType({
// 	name: 'Mutation',
// 	description: 'Default mutation provided by the backend APIs',
// 	fields: {
// 		addUser: UserMutation.create(),
// 		updateUser: UserMutation.update(),
// 		deleteUser: UserMutation.delete(),
// 		addTodo: TodoMutation.create(),
// 	},
// });

// export the schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  //mutation: RootMutation,
});
