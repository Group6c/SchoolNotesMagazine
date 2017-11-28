'use strict';

describe('Users E2E Tests:', function () {
  var user1 = {
    firstName: 'test',
    lastName: 'user',
    email: 'test.user@meanjs.com',
    username: 'testUser',
    password: 'P@$$w0rd!!'
  };

  var user2 = {
    firstName: 'Yaz',
    lastName: 'Mansweety',
    teacherFirstName: 'B',
    teacherLastName: 'Gayle',
    schoolName: 'Florida elementry',
    studentGrade: '3rd',
    notes: 'great piece I colored',
    email: 'test.user2@meanjs.com',
    username: 'testUser2',
    password: 'P@$$w0rd!!',
    contestName: 'Create A Conservation Commercial Competition',
    art: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAtAAAALQ',
    picture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAtAAAALQ'
    };

  var signin = function () {
    // Make sure user is signed out first
    browser.get('http://localhost:3000/authentication/signin');
    // Add username
    element(by.model('vm.credentials.usernameOrEmail')).sendKeys(user2.username);
    // Add Password
    element(by.model('vm.credentials.password')).sendKeys(user2.password);
    element(by.css('button[type=submit]')).click();
  };

  describe('Submission Tests', function () {

    it('Should route to contest after Submission', function () {
      // Make sure user is signed in first
      signin();
      // Go to family quest page
      element(by.css('button[id="familyQuests"]')).click();
      // Go to Submission
      element(by.css('a[href="/contests/5a18fc0ede55b60db4869cfb"]')).click();
      // Click Go to Submission
      element(by.css('a[id="createSubmission"]')).click();
      // Add first name
      element(by.model('vm.submission.studentFirstName')).sendKeys(user2.firstName);
      // Add last name
      element(by.model('vm.submission.studentLastName')).sendKeys(user2.lastName);
      // Add Teacher's First name
      element(by.model('vm.submission.teacherFirstName')).sendKeys(user2.teacherFirstName);
      // Add Teacher's Last name
      element(by.model('vm.submission.teacherLastName')).sendKeys(user2.teacherLastName);
      // Add a School Name
      element(by.model('vm.submission.school')).sendKeys(user2.schoolName);
      // Add a student grade
      element(by.model('vm.submission.grade')).sendKeys(user2.studentGrade);
      // Add a email
      element(by.model('vm.submission.email')).sendKeys(user2.email);
      // Add a note
      element(by.model('vm.submission.notes')).sendKeys(user2.notes);
      // // Add a photo of work
      // element(by.model('vm.submission.art')).sendKeys(user2.art);
      // // Add another photo
      // element(by.model('vm.submission.picture')).sendKeys(user2.picture);
      browser.pause();
      // Add Contest Name
      element(by.model('vm.submission.contestName')).sendKeys(user2.contestName);
      //Submit
      element(by.css('button[id="submissionSubmit"]')).click();
      browser.driver.sleep(500);
      expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/contests/5a18fc0ede55b60db4869cfb');

    });

  });

  describe('Testing Routes', function () {

    it('Should route to events', function () {
      // Homepage
      browser.get('http://localhost:3000/');
      // Go to family quest page
      element(by.css('button[id="events"]')).click();
      // // Go To Read Aloud Challenge
      // element(by.css('a[href="/contests/5a18fc0ede55b60db4869cfb"]')).click(); 
      expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/events');

    });

  });

});
