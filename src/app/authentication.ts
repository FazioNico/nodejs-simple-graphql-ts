/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   16-08-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 19-08-2017
*/

import { verify } from 'jsonwebtoken';
// Import secretTokenKey config
import { CONFIG } from "./config";
import { IUserModel } from "./models/user.models";

// declare var Promise:any;

export class Authentication {
  public static checkAuthentication(req): Promise<IUserModel>  {


    // look for the token in the incoming request:
    let token: string = req.body.token || req.query.token ||
    req.get('x-access-token') || req.get('authentication') || undefined;

    if (token === undefined) {
      // there is no token!
      //return(false);
      return Promise.reject(new Error('user not auth.'))
    } else {
      return new Promise((resolve, reject) => {
        verify(token, CONFIG.secretTokent,  (err: Error, decoded: any): boolean|any => {
          if (err) {
            reject(new Error('user not have authorization to access.'));
          } else {
            // console.log('req.decoded-> ', decoded._doc )
            req.decoded = decoded;
            resolve(decoded._doc);
          }
        });
      })
      .then(result => {
        return result
      })
      .catch(err => {
        return err
      })

    }
  }

}
