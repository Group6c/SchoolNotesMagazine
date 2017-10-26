'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Quest = mongoose.model('Quest'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  quest;

/**
 * Quest routes tests
 */
describe('Quest CRUD tests', function () {

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

    // Save a user to the test db and create new Quest
    user.save(function () {
      quest = {
        name: 'Quest name'
      };

      done();
    });
  });

  it('should be able to save a Quest if logged in', function (done) {
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

        // Save a new Quest
        agent.post('/api/quests')
          .send(quest)
          .expect(200)
          .end(function (questSaveErr, questSaveRes) {
            // Handle Quest save error
            if (questSaveErr) {
              return done(questSaveErr);
            }

            // Get a list of Quests
            agent.get('/api/quests')
              .end(function (questsGetErr, questsGetRes) {
                // Handle Quests save error
                if (questsGetErr) {
                  return done(questsGetErr);
                }

                // Get Quests list
                var quests = questsGetRes.body;

                // Set assertions
                (quests[0].user._id).should.equal(userId);
                (quests[0].name).should.match('Quest name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Quest if not logged in', function (done) {
    agent.post('/api/quests')
      .send(quest)
      .expect(403)
      .end(function (questSaveErr, questSaveRes) {
        // Call the assertion callback
        done(questSaveErr);
      });
  });

  it('should not be able to save an Quest if no name is provided', function (done) {
    // Invalidate name field
    quest.name = '';

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

        // Save a new Quest
        agent.post('/api/quests')
          .send(quest)
          .expect(400)
          .end(function (questSaveErr, questSaveRes) {
            // Set message assertion
            (questSaveRes.body.message).should.match('Please fill Quest name');

            // Handle Quest save error
            done(questSaveErr);
          });
      });
  });

  it('should be able to update an Quest if signed in', function (done) {
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

        // Save a new Quest
        agent.post('/api/quests')
          .send(quest)
          .expect(200)
          .end(function (questSaveErr, questSaveRes) {
            // Handle Quest save error
            if (questSaveErr) {
              return done(questSaveErr);
            }

            // Update Quest name
            quest.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Quest
            agent.put('/api/quests/' + questSaveRes.body._id)
              .send(quest)
              .expect(200)
              .end(function (questUpdateErr, questUpdateRes) {
                // Handle Quest update error
                if (questUpdateErr) {
                  return done(questUpdateErr);
                }

                // Set assertions
                (questUpdateRes.body._id).should.equal(questSaveRes.body._id);
                (questUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Quests if not signed in', function (done) {
    // Create new Quest model instance
    var questObj = new Quest(quest);

    // Save the quest
    questObj.save(function () {
      // Request Quests
      request(app).get('/api/quests')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Quest if not signed in', function (done) {
    // Create new Quest model instance
    var questObj = new Quest(quest);

    // Save the Quest
    questObj.save(function () {
      request(app).get('/api/quests/' + questObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', quest.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Quest with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/quests/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Quest is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Quest which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Quest
    request(app).get('/api/quests/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Quest with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Quest if signed in', function (done) {
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

        // Save a new Quest
        agent.post('/api/quests')
          .send(quest)
          .expect(200)
          .end(function (questSaveErr, questSaveRes) {
            // Handle Quest save error
            if (questSaveErr) {
              return done(questSaveErr);
            }

            // Delete an existing Quest
            agent.delete('/api/quests/' + questSaveRes.body._id)
              .send(quest)
              .expect(200)
              .end(function (questDeleteErr, questDeleteRes) {
                // Handle quest error error
                if (questDeleteErr) {
                  return done(questDeleteErr);
                }

                // Set assertions
                (questDeleteRes.body._id).should.equal(questSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Quest if not signed in', function (done) {
    // Set Quest user
    quest.user = user;

    // Create new Quest model instance
    var questObj = new Quest(quest);

    // Save the Quest
    questObj.save(function () {
      // Try deleting Quest
      request(app).delete('/api/quests/' + questObj._id)
        .expect(403)
        .end(function (questDeleteErr, questDeleteRes) {
          // Set message assertion
          (questDeleteRes.body.message).should.match('User is not authorized');

          // Handle Quest error error
          done(questDeleteErr);
        });

    });
  });

  it('should be able to get a single Quest that has an orphaned user reference', function (done) {
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

          // Save a new Quest
          agent.post('/api/quests')
            .send(quest)
            .expect(200)
            .end(function (questSaveErr, questSaveRes) {
              // Handle Quest save error
              if (questSaveErr) {
                return done(questSaveErr);
              }

              // Set assertions on new Quest
              (questSaveRes.body.name).should.equal(quest.name);
              should.exist(questSaveRes.body.user);
              should.equal(questSaveRes.body.user._id, orphanId);

              // force the Quest to have an orphaned user reference
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

                    // Get the Quest
                    agent.get('/api/quests/' + questSaveRes.body._id)
                      .expect(200)
                      .end(function (questInfoErr, questInfoRes) {
                        // Handle Quest error
                        if (questInfoErr) {
                          return done(questInfoErr);
                        }

                        // Set assertions
                        (questInfoRes.body._id).should.equal(questSaveRes.body._id);
                        (questInfoRes.body.name).should.equal(quest.name);
                        should.equal(questInfoRes.body.user, undefined);

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
      Quest.remove().exec(done);
    });
  });
});
