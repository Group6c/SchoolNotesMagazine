'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * event Schema
 */
var EventSchema = new Schema({
  title: {
    type: String,
    default: '',
    required: 'Please fill event name',
    trim: true
  },
  body: {
    type: String,
    default: '',
    required: 'Please fill Body',
    trim: true
  },
  date: {
    type: String,
    default: '',
    trim: true
  },
  address: {
    type: String,
    default: '',
    trim: true
  },
  // this is for image
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

mongoose.model('Event', EventSchema);
