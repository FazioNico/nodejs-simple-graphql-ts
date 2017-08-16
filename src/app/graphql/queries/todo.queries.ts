/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   15-08-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 15-08-2017
 */

import {
 	GraphQLList,
 	GraphQLID,
 	GraphQLNonNull,
} from 'graphql';

 // import the user type we created
 import { TodoType } from '../types/todo.type'
 // import the user resolver we created
 import { TodoResolver } from "../resolvers/todo.resolver"


export const TodoQuery = {
 	/*
 	exemple:
 	{
 		todos {
 			id
 			description
 			deadline
 			expire
 		}
 	}
 	*/
 	index() {
 		return {
 			type: new GraphQLList(TodoType),
 			description: 'This will return all the todos present in the database',
 			resolve(parent, args, context, info) {
        return TodoResolver.index()
 				//return TodoResolver.index({});
 			}
 		}
 	},
 	/*
 	exemple:
 	{
 		todo(id: "58f7642bb6520d0ba8c2f4af") {
 			id
 			description
 			deadline
 			expire
 		}
 	}
 	 */
 	single() {
 		return {
 			type: TodoType,
 			description: 'This will return data of a single todo based on the id provided',
 			args: {
 				id: {
 					type: new GraphQLNonNull(GraphQLID),
 					description: 'Please enter todo id',
 				}
 			},
 			resolve(parent, args, context, info) {
 				return TodoResolver.single({ id: args.id });
 			}
 		}
 	},

 };
