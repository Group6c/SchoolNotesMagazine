'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Contest = mongoose.model('Contest'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  contest;

/**
 * Contest routes tests
 */
describe('Contest CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Contest
    user.save(function () {
      contest = {
        name: 'Contest name'
      };

      done();
    });
  });

  it('should be able to save a Contest if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Contest
        agent.post('/api/contests')
          .send(contest)
          .expect(200)
          .end(function (contestSaveErr, contestSaveRes) {
            // Handle Contest save error
            if (contestSaveErr) {
              return done(contestSaveErr);
            }

            // Get a list of Contests
            agent.get('/api/contests')
              .end(function (contestsGetErr, contestsGetRes) {
                // Handle Contests save error
                if (contestsGetErr) {
                  return done(contestsGetErr);
                }

                // Get Contests list
                var contests = contestsGetRes.body;

                // Set assertions
                (contests[0].user._id).should.equal(userId);
                (contests[0].name).should.match('Contest name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Contest if not logged in', function (done) {
    agent.post('/api/contests')
      .send(contest)
      .expect(403)
      .end(function (contestSaveErr, contestSaveRes) {
        // Call the assertion callback
        done(contestSaveErr);
      });
  });

  it('should not be able to save an Contest if no name is provided', function (done) {
    // Invalidate name field
    contest.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Contest
        agent.post('/api/contests')
          .send(contest)
          .expect(400)
          .end(function (contestSaveErr, contestSaveRes) {
            // Set message assertion
            (contestSaveRes.body.message).should.match('Please fill Contest name');

            // Handle Contest save error
            done(contestSaveErr);
          });
      });
  });

  it('should be able to update an Contest if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Contest
        agent.post('/api/contests')
          .send(contest)
          .expect(200)
          .end(function (contestSaveErr, contestSaveRes) {
            // Handle Contest save error
            if (contestSaveErr) {
              return done(contestSaveErr);
            }

            // Update Contest name
            contest.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Contest
            agent.put('/api/contests/' + contestSaveRes.body._id)
              .send(contest)
              .expect(200)
              .end(function (contestUpdateErr, contestUpdateRes) {
                // Handle Contest update error
                if (contestUpdateErr) {
                  return done(contestUpdateErr);
                }

                // Set assertions
                (contestUpdateRes.body._id).should.equal(contestSaveRes.body._id);
                (contestUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Contests if not signed in', function (done) {
    // Create new Contest model instance
    var contestObj = new Contest(contest);

    // Save the contest
    contestObj.save(function () {
      // Request Contests
      request(app).get('/api/contests')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Contest if not signed in', function (done) {
    // Create new Contest model instance
    var contestObj = new Contest(contest);

    // Save the Contest
    contestObj.save(function () {
      request(app).get('/api/contests/' + contestObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', contest.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Contest with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/contests/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Contest is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Contest which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Contest
    request(app).get('/api/contests/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Contest with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Contest if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Contest
        agent.post('/api/contests')
          .send(contest)
          .expect(200)
          .end(function (contestSaveErr, contestSaveRes) {
            // Handle Contest save error
            if (contestSaveErr) {
              return done(contestSaveErr);
            }

            // Delete an existing Contest
            agent.delete('/api/contests/' + contestSaveRes.body._id)
              .send(contest)
              .expect(200)
              .end(function (contestDeleteErr, contestDeleteRes) {
                // Handle contest error error
                if (contestDeleteErr) {
                  return done(contestDeleteErr);
                }

                // Set assertions
                (contestDeleteRes.body._id).should.equal(contestSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Contest if not signed in', function (done) {
    // Set Contest user
    contest.user = user;

    // Create new Contest model instance
    var contestObj = new Contest(contest);

    // Save the Contest
    contestObj.save(function () {
      // Try deleting Contest
      request(app).delete('/api/contests/' + contestObj._id)
        .expect(403)
        .end(function (contestDeleteErr, contestDeleteRes) {
          // Set message assertion
          (contestDeleteRes.body.message).should.match('User is not authorized');

          // Handle Contest error error
          done(contestDeleteErr);
        });

    });
  });

  it('should be able to get a single Contest that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Contest
          agent.post('/api/contests')
            .send(contest)
            .expect(200)
            .end(function (contestSaveErr, contestSaveRes) {
              // Handle Contest save error
              if (contestSaveErr) {
                return done(contestSaveErr);
              }

              // Set assertions on new Contest
              (contestSaveRes.body.name).should.equal(contest.name);
              should.exist(contestSaveRes.body.user);
              should.equal(contestSaveRes.body.user._id, orphanId);

              // force the Contest to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Contest
                    agent.get('/api/contests/' + contestSaveRes.body._id)
                      .expect(200)
                      .end(function (contestInfoErr, contestInfoRes) {
                        // Handle Contest error
                        if (contestInfoErr) {
                          return done(contestInfoErr);
                        }

                        // Set assertions
                        (contestInfoRes.body._id).should.equal(contestSaveRes.body._id);
                        (contestInfoRes.body.name).should.equal(contest.name);
                        should.equal(contestInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Contest.remove().exec(done);
    });
  });
});
