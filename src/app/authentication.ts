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

 export class Authentication {
   public static checkAuthentication(req): boolean|any  {
     // look for the token in the incoming request:
     let token: string = req.body.token || req.query.token ||
       req.get('x-access-token') || req.get('authentication') || undefined;

     if (token === undefined) {
       // there is no token!
       return(false);
     } else {
       return new Promise((resolve, reject) => {
         verify(token, CONFIG.secretTokent,  (err: Error, decoded: any): boolean|any => {
           if (err) {
             reject(false);
           } else {
             // console.log('req.decoded-> ', decoded._doc )
             req.decoded = decoded;
             resolve({success:true, user: decoded._doc});
           }
         });
       })
       .then(result => {
         return result
       })
       .catch(err => {
         return false
       })
       
     }
   }

 }
