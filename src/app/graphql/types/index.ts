/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   17-08-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 19-08-2017
*/

import * as todoType from "./todo.type";
import * as userType from "./user.type";
import * as commonType from "./common.type";
import * as queryType from "./queries";
import * as mutationsType from "./mutations";

const typesModules = [
  todoType,
  userType,
  commonType,
  queryType,
  mutationsType,
];

const mainDefs = [`
    schema {
        query: Query,
        mutation: Mutation
    }
`,
];

export const typeDefs = [
  ...mainDefs,
  ...typesModules.map((m) => m.typeDef)
                 .filter((res) => !!res)
];
