/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-08-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 16-08-2017
*/

import * as mongoose from 'mongoose'

import { User, IUserModel } from "../../models/user.models";

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

    //return a;
  },

  // this will find a single user based on id and return it.
  single( options ):Promise<IUserModel> {
    return User.findOne({ _id: options.id })
    .exec()
    .then( item => {
      return item;
    })
    .catch( error => {
      return error;
    });
  },

  // this will insert a new user in database
  create(data):Promise<IUserModel> {
    const newitem = new User(data);
    console.log('###########')
    console.log('new User-> ', data)
    return newitem.save()
    .then( (result) => {
      return result;
    })
    .catch( (error) => {
      return error;
    });
  },

  // this will update existing record in database
  update(data):Promise<IUserModel> {
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
  },

  // this will remove the record from database.
  delete( options ):Promise<{status:boolean}> {
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
