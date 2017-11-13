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

mongoose.model('Contest', ContestSchema);
