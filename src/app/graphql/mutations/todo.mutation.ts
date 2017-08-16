/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   15-08-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 16-08-2017
 */

 import {
 	GraphQLNonNull,
 	GraphQLString,
 	GraphQLInt,
 	GraphQLID,
  GraphQLBoolean
} from  'graphql'

 // import user type
 import { TodoType } from "../types/todo.type"
 // import user resolver
 import { TodoResolver } from "../resolvers/todo.resolver"

 export const TodoMutation = {

 	create() {
 		/*
 		exemple:
 		mutation {
 		  addTodo (
 		    description: "fst todo test",
 		    deadline: 1502790549874
 		  ) {
 		    id
 		    description
 		    deadline
 				expire
 		  }
 		}
 		 */
 		return {
 			type: TodoType,
 			description: 'Add new Todo',

 			args: {
 				description: {
 					type: new GraphQLNonNull(GraphQLString),
 					description: 'Enter todo descrtiption , Cannot be left empty',
 				},
 				deadline: {
 					type: new GraphQLNonNull(GraphQLString),
 					description: 'todo deadlin number value (timestamp)',
 				},
 			},
 			resolve(parent, fields) {
 				return TodoResolver.create(fields);
 			}
 		}
 	},
  update() {
    /*
    mutation {
      updateTodo (
        id:"$todo_id"
        description: "second todo test updated!!",
        deadline: "15027916100003"
      ) {
        id
        description
        deadline,
        expire
      }
    }
     */
		return {
			type: TodoType,
			description: 'Update todo details',

			args: {
        id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Enter todo id',
				},
        description: {
 					type: GraphQLString,
					description: 'Enter todo descrtiption , Cannot be left empty',
				},
        deadline: {
          type: GraphQLString,
          description: 'todo deadlin number value (timestamp)',
				},
        isComplete: {
          type: GraphQLBoolean,
          description: 'todo completed status. isComplet: true, !isComplet: false',
				},
        expire: {
          type: GraphQLBoolean,
          description: 'todo expiration status. isExpired: true, !isExpired: false',
				},
			},
			resolve(parent, fields) {
				return TodoResolver.update(fields);
			}

		}
	},
	delete() {
    /*
    mutation {
      deleteTodo (
        id:"$todo_id"
      ) {
        id
      }
    }
     */
		return {
			type: TodoType,
			description: 'Delete existing Todo',

			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Enter todo id',
				},
			},
			resolve(parent, fields) {
				return TodoResolver.delete(fields);
			}
		}
	},
 };
