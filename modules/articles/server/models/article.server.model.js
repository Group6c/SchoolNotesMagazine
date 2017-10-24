'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
  title: {
    type: String,
    default: '',
    required: 'Please fill Article name',
    trim: true
  },
  body: {
    type: String,
    default: '',
    required: 'Please fill Body',
    trim: true
  },
  tags: {
    type: String,
    default: '',
    trim: true
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

mongoose.model('Article', ArticleSchema);
