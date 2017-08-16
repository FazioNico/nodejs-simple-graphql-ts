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
 	GraphQL exemple:
 	{
 		user(id: "$USER_ID") {
    id
    email
    created
    admin
 		}
 	}
  Postman exemple:
  {
    "query": "query ($id: ID!) { user(id: $id) {id, email, created, admin} }",
    "variables": {
      "id": "5992b50893b4a617f1005f6f"
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
        // TODO: check in console to get user token ....
        // console.log('-------------', info)
        const userToken = context.headers['x-access-token']
        // console.log('-------------', userToken)
 				return UserResolver.single(context, { id: args.id });
 			}
 		}
 	},

 };
