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
 import { UserType } from "../types/user.type"
 // import user resolver
 import { UserResolver } from "../resolvers/user.resolver"

 export const UserMutation = {

 	create() {
    /*
		exemple:
		mutation {
		  addUser (
        email: "john.doe@gmail.com",
        password: "Passw0rd"
      ) {
		    id
		    email
		  }
		}
		//
		mutation {
			addUser (
        email: "john.doe@gmail.com",
        password: "Passw0rd"
      )
		}
		 */
 		return {
 			type: UserType,
 			description: 'Add new User',

 			args: {
				email: {
					type: new GraphQLNonNull(GraphQLString),
					description: 'Enter users email address, Must be valid and unique',
				},
				password: {
					type: new GraphQLNonNull(GraphQLString),
					description: 'Enter users password, will be automatically hashed',
				},
				created: {
					type: GraphQLString,
					description: 'Enter users created date as new Date() format string',
				},
				admin: {
					type: GraphQLBoolean,
					description: 'Enters users status, by default its set to false. !admin: false, admin: true',
				},
 			},
 			resolve(parent, fields) {
 				return UserResolver.create(fields);
 			}
 		}
 	},
  update() {
    /*
    mutation {
      updateUser (
        id:"$user_id"
        admin: true
      ) {
        id
        email
        admin
      }
    }
     */
		return {
			type: UserType,
			description: 'Update user details',

			args: {
        id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Enter user id',
				},
        email: {
					type: GraphQLString,
					description: 'Enter users email address, Must be valid and unique',
				},
        created: {
          type: GraphQLString,
          description: 'Enter users created date as new Date() format string',
				},
        admin: {
          type: GraphQLBoolean,
          description: 'user status, by default its set to false. !admin: false, admin: true',
				},
        password: {
					type: GraphQLString,
					description: 'Enter users password, will be automatically hashed',
				},
			},
			resolve(parent, fields, context) {
        //console.log(context)
				return UserResolver.update(context, fields);
			}
		}
	},
	delete() {
    /*
    mutation {
      deleteUser (
        id:"$user_id"
      ) {
        id
      }
    }
     */
		return {
			type: UserType,
			description: 'Delete existing user',

			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Enter user id',
				},
			},
			resolve(parent, fields) {
				return UserResolver.delete(fields);
			}
		}
	},
 };
