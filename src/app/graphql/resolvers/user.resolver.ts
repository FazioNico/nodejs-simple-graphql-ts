/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-08-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 16-08-2017
*/

import * as mongoose from 'mongoose'

import { User, IUserModel } from "../../models/user.models";
import { Authentication } from '../../authentication';

export const UserResolver = {
  // this will find all users in database and return it
  index():Promise<IUserModel[]>{
    return User.find()
    .sort('deadline')
    .exec()
    .then( records => {
      return records;
    })
    .catch( error => {
      return error;
    });

  },

  // this will find a single user based on id and return it.
  single( context, options ):Promise<IUserModel>  {
    const isAuth = Authentication.checkAuthentication(context)
    if(isAuth) {
      return isAuth
      .then(doc => {
        // check if user token ID is same of reqest options.id
        if(doc.user._id != options.id ){
          return Promise.reject('user not have authorization to access.')
        }
        // if user is same... do stuff
        return User.findOne({ _id: options.id })
        .exec()
        .then( item => {
          return item;
        })
        .catch( error => {
          return error;
        });
      })

    }
    else {
      return Promise.reject('user not auth')
    }
  },

  // this will insert a new user in database
  create(data):Promise<IUserModel> {
    const newitem = new User(data);
    // TODO:
    // Encrypt pwd + return token for client localstorage
    return newitem.save()
    .then( (result) => {
      return result;
    })
    .catch( (error) => {
      return error;
    });
  },

  // this will update existing record in database
  update(context, data):Promise<IUserModel> {
    const isAuth = Authentication.checkAuthentication(context)
    if(isAuth) {
      return isAuth
      .then(doc => {
        // check if user token ID is same of reqest data.id
        if(doc.user._id != data.id ){
          return Promise.reject('user not have authorization to update user.')
        }
        return User.findOne({ _id: data.id })
        .exec()
        .then( (item) => {
          Object.keys(data).map( field => {
            item[field] = data[field];
          });

          return item.save()
          .then( updated => {
            return updated;
          })
          .catch( (error) => {
            return error;
          });

        })
        .catch( (error) => {
          return error;
        });
      })
    }
    else {
      return Promise.reject('user not auth')
    }
  },

  // this will remove the record from database.
  delete( options ):Promise<{status:boolean,id:string}> {
    return User.findById( options.id )
    .exec()
    .then( item => {
      item.remove();
      return { status: true, id:options.id };
    })
    .catch( error => {
      return error;
    });
  }

};
