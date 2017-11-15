'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Contest Schema
 */
var ContestSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Contest name',
    trim: true
  },
  description: {
    type: String,
    default: '',
    required: 'Please fill Contest description',
    trim: true
  },
  Dates:{
    type: Date,
    default:''
  },
  //contest pic
  thumbnail: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }

});
//submission schema
var SubmissionSchema = new Schema({
  //use user from that schema to link
  studentFirstName:{
    type: String,
    default: ''
  },
  studentLastName:{
    type: String,
    default: ''
  },
  teacherFirstName:{
    type: String,
    default: ''
  },
  teacherLastName:{
    type: String,
    default: ''
  },
  school:{
    type: String,
    default:''
  },
  grade:{
    type: String,
    default:''
  },
  email:{
    type: String,
    default:''
  },
  description: {
    type: String,
    default: ''
  },
  notes: {
    type: String,
    default: ''
  },
  picId: {
    type: Schema.ObjectId,
    ref: "Contest"
  },
  picture:{
    type: String
    default: ''
  },
  art:{
    type: String
    default: ''
  },
  created:{
    type: Date,
    default: Date.now
  }
});
mongoose.model('Contest', ContestSchema);
