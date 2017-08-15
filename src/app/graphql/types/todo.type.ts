/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   15-08-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 15-08-2017
 */

 import {
 	GraphQLObjectType,
 	GraphQLString,
 	GraphQLBoolean,
 	GraphQLID,
 	GraphQLInt
 } from 'graphql';

 export const TodoType:GraphQLObjectType = new GraphQLObjectType({
 	name: 'Todo',
 	description: 'Todo type for managing all the Todos.',

 	fields: () => ({
 		id: {
 			type: GraphQLID,
 			description: 'ID of the todo, Generated automatically by MongoDB',
 		},
 		description: {
 			type: GraphQLString,
 			description: 'description of the todo',
 		},
 		isComplete: {
 			type: GraphQLBoolean,
 			description: 'describ if todo is completed',
 		},

 		deadline: {
 			type: GraphQLString,
 			description: 'deadline of the todo',
 		},

 		expire: {
 			type: GraphQLBoolean,
 			description: 'expired status',
 		}

 	})
 });
