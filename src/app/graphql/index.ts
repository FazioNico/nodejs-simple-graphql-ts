/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-08-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 18-08-2017
*/

import { GraphQLObjectType, GraphQLObjectTypeConfig, GraphQLSchema, GraphQLInterfaceTypeConfig } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools'
import { typeDefs } from "./types";
import { resolvers } from "./resolvers";



export const schemas = makeExecutableSchema({
  typeDefs: [...typeDefs],
  resolvers,
});
