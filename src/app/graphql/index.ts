/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-08-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 19-08-2017
*/

import { makeExecutableSchema } from 'graphql-tools'
import { typeDefs } from "./types";
import { resolvers } from "./resolvers";

// console.log(typeDefs)
export const schemas = makeExecutableSchema({
  typeDefs: [...typeDefs],
  resolvers,
});
