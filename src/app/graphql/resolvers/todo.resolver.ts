/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-08-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 15-08-2017
*/

import * as mongoose from 'mongoose'
;
import { Todo, ITodoModel } from "../../models/todo.models";

class TodoController {

  public model:mongoose.Model<ITodoModel>
  constructor() {
    this.model = Todo;
  }

  // this will find all the records in database and return it
  index() {
    return this.model.find()
    .sort('deadline')
    .exec()
    .then( records => {
      return records;
    })
    .catch( error => {
      return error;
    });
  }

  // this will find a single item based on id and return it.
  single( options ) {
    return this.model.findOne({ _id: options.id })
    .exec()
    .then( item => {
      return item;
    })
    .catch( error => {
      return error;
    });
  }

  // this will insert a new item in database
  create(data) {
    const newitem = new this.model(data);
    console.log('###########')
    console.log('new todo-> ', data)
    return newitem.save()
    .then( (result) => {
      return result;
    })
    .catch( (error) => {
      return error;
    });
  }

  // this will update existing record in database
  update(data) {
    return this.model.findOne({ _id: data.id })
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
  }

  // this will remove the record from database.
  delete( options ) {
    this.model.findById( options.id )
    .exec()
    .then( item => {
      item.remove();
      return { status: true };
    })
    .catch( error => {
      return error;
    });
  }

};

export const TodoResolver = new TodoController();
//module.exports = todo_controller;
