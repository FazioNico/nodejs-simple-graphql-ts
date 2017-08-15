/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-08-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 15-08-2017
*/

import * as mongoose from 'mongoose';

export const todoSchema:mongoose.Schema = new mongoose.Schema({
  description: { type: String, required: true  },
  isComplete: {
    type: Boolean,
    default: false
  },
  deadline: { type: String },
  expire: { type: Boolean, default: false }
});
todoSchema.pre('save', (next)=> {
	next();
});

export interface ITodoModel extends mongoose.Document {
  description: string;
  isComplete: boolean;
  deadline?: number;
  expire?: boolean;
}

// Define & export Mongoose Model with Interface
export const Todo:mongoose.Model<ITodoModel> = mongoose.model<ITodoModel>('todos', todoSchema);
