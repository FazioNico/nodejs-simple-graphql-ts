/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-08-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 17-08-2017
*/

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt
} from 'graphql';

export const UserType:GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  description: 'User type for managing all the Users.',

  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'ID of the User, Generated automatically by MongoDB',
    },
    email: {
      type: GraphQLString,
      description: 'Email address of the user, must be valid and unique',
    },
    admin: {
      type: GraphQLBoolean,
      description: 'admin status of the user',
    },
    created: {
      type: GraphQLString,
      description: 'Date and time when this users account was created',
    }
  })
});

export const AuthType:GraphQLObjectType = new GraphQLObjectType({
  name: 'Auth',
  description: 'Auth type for managing token authentication.',

  fields: () => ({
    user: {
      type: UserType,
      description: 'User datas',
    },
    token: {
      type: GraphQLString,
      description: 'user token',
    }
  })
});
