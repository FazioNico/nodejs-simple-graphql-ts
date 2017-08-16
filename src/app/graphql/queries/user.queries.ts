/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   15-08-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 16-08-2017
 */

import {
 	GraphQLList,
 	GraphQLID,
 	GraphQLNonNull,
} from 'graphql';

 // import the user type we created
 import { UserType } from '../types/user.type'
 // import the user resolver we created
 import { UserResolver } from "../resolvers/user.resolver"


export const UserQuery = {
 	/*
 	exemple:
  {
 		users {
 			id
      email
      created
  		admin
 		}
 	}
 	*/
 	index() {
 		return {
 			type: new GraphQLList(UserType),
 			description: 'This will return all the todos present in the database',
 			resolve(parent, args, context, info) {
        return UserResolver.index()
 				//return TodoResolver.index({});
 			}
 		}
 	},
 	/*
 	exemple:
 	{
 		user(id: "$USER_ID") {
    id
    email
    created
    admin
 		}
 	}
 	 */
 	single() {
 		return {
 			type: UserType,
 			description: 'This will return data of a single todo based on the id provided',
 			args: {
 				id: {
 					type: new GraphQLNonNull(GraphQLID),
 					description: 'Please enter todo id',
 				}
 			},
 			resolve(parent, args, context, info) {
 				return UserResolver.single({ id: args.id });
 			}
 		}
 	},

 };
