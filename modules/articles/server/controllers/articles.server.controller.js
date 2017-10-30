'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './modules/articles/client/img/'); // where to store it
  },
  filename: function (req, file, cb) {
    if(!file.originalname.match(/\.(png|jpg|jpeg|pdf|gif)$/)) {
      console.log("filename error");
      var err = new Error();
      err.code = 'filetype'; // to check on file type
      return cb(err);
    } else {
      console.log("produced filename");
      var day = new Date();
      var d = day.getDay();
      var h = day.getHours();
      var fileNamee = d + '_' + h + '_' + file.originalname;
      console.log("filename produced is: " + fileNamee);
      cb(null, fileNamee);
    }
  }
});

var upload = multer({
  storage: storage,
  limits: { fileSize: 20971520 } // Max file size: 20MB
}).single('myfile'); // name in form

exports.uploads = function (req, res) {
  console.log("in uploads");
  upload(req, res, function (err) {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        res.json({ success: false, message: 'File size is too large. Max limit is 20MB' });
      } else if (err.code === 'filetype') {
        res.json({ success: false, message: 'File type is invalid. Accepted types are .png/.jpg/.jpeg/.pdf' });
      } else {
        console.log('err = ' + err);
        res.json({ success: false, message: 'File was not able to be uploaded' });
      }
    } else {
      if (!req.file) {
        console.log("reached here with !rep.file");
        var article = new Article(req.body);
        article.user = req.user;

        article.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.jsonp(article);
          }
        });
      }
      else if (req.file) {
        console.log("reached here with req.file");
        res.json({ success: true, message: 'File was uploaded!' });
      }

    }
    // Everything went fine
  });
};

/**
 * Create a Article
 */
exports.create = function(req, res) {
  var article = new Article(req.body);
  article.user = req.user;

  article.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(article);
    }
  });
};

/**
 * Show the current Article
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var article = req.article ? req.article.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  article.isCurrentUserOwner = req.user && article.user && article.user._id.toString() === req.user._id.toString();

  res.jsonp(article);
};

/**
 * Update a Article
 */
exports.update = function(req, res) {
  var article = req.article;

  article = _.extend(article, req.body);

  // article.title = req.body.title;
  // article.body = req.body.body;
  // article.tags = req.body.tags;
  // article.thumbnail = req.body.thumbnail;

  article.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(article);
    }
  });
};

/**
 * Delete an Article
 */
exports.delete = function(req, res) {
  var article = req.article;

  article.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(article);
    }
  });
};

/**
 * List of Articles
 */
exports.list = function(req, res) {
  Article.find().sort('-created').populate('user', 'displayName').exec(function(err, articles) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(articles);
    }
  });
};

/**
 * Article middleware
 */
exports.articleByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Article is invalid'
    });
  }

  Article.findById(id).populate('user', 'displayName').exec(function (err, article) {
    if (err) {
      return next(err);
    } else if (!article) {
      return res.status(404).send({
        message: 'No Article with that identifier has been found'
      });
    }
    req.article = article;
    next();
  });
};
