/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-08-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 16-08-2017
*/

import { GraphQLObjectType, GraphQLObjectTypeConfig, GraphQLSchema, GraphQLInterfaceTypeConfig } from 'graphql';
// import all query files
//import { UserQuery } from './queries/user.queries'
import { TodoQuery } from './queries/todo.queries'
// import all mutation files
// import { UserMutation } from "./mutations/user.mutation";
import { TodoMutation } from "./mutations/todo.mutation";

// define root query
const rootQueryConfig:GraphQLObjectTypeConfig<any,any> = {
  name: 'RootQueryType',
  description: 'This is the default root query provided by the backend',
  fields: {
    // 	users: UserQuery.index(),
    // 	user: UserQuery.single(),
    todos: TodoQuery.index(),
    todo: TodoQuery.single(),
  }
};
const RootQuery:GraphQLObjectType = new GraphQLObjectType(rootQueryConfig);

// define root mutation
const rootMutationConfig:GraphQLObjectTypeConfig<any,any> = {
	name: 'Mutation',
	description: 'Default mutation provided by the backend APIs',
	fields: {
		// addUser: UserMutation.create(),
		// updateUser: UserMutation.update(),
		// deleteUser: UserMutation.delete(),
    addTodo: TodoMutation.create(),
    updateTodo: TodoMutation.update(),
		deleteTodo: TodoMutation.delete(),
	},
}
const RootMutation:GraphQLObjectType = new GraphQLObjectType(rootMutationConfig);

// export the schema (currently not use)
export const graphQLSchema = {
  query: RootQuery,
  mutation: RootMutation,
  subscription: null
};
// export const schemas = makeExecutableSchema({
//   graphQLSchema,
//   resolvers,
// });

// Meke GraphQLSchema exportable as a module
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
  subscription: null
});
