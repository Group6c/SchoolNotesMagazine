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

var SubmissionSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Submission name',
    trim: true
  },
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
  picture:{
    type: String,
    default: ''
  },
  art:{
    type: String,
    default: ''
  },
  contestName: {
    type: String,
    default: '',
    required: 'Please fill Contest name',
    trim: true
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

mongoose.model('Contest', ContestSchema);
mongoose.model('Submission', SubmissionSchema);
