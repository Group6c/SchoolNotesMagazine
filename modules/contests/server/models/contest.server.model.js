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
  thumbnail: {
    type: String
  },
  winner:{
      type: String,
      default:"1sadasdasd"
  },
  date:{
    type: String,
    default:''
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
  //first picture
  pictureImageString:{
    type: String,
    default: ''
  },
  //second picture
  artImageString:{
    type: String,
    default: ''
  },
  contestName: {
    type: String,
    default: '',
    required: 'Please fill Contest name',
  },
  // date:{
  //   type: String,
  //   default:''
  // },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

//making submission schema
mongoose.model('Contest', ContestSchema);
mongoose.model('Submission', SubmissionSchema);
