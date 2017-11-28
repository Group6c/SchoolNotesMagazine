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
    firstName: 'test',
    lastName: 'user2',
    email: 'test.user2@meanjs.com',
    username: 'testUser2',
    password: 'P@$$w0rd!!'
  };

  var signout = function () {
    // Make sure user is signed out first
    browser.get('http://localhost:3000/authentication/signout');
    // Delete all cookies
    browser.driver.manage().deleteAllCookies();
  };

  describe('Submission Route', function () {

    it('Should route to contest page after Submission', function () {
      // Make sure user is signed out first
      // signout();
      // Homepage
      browser.get('http://localhost:3000/');
      // Go to family quest page
      element(by.css('button[id="schoolNotesButton"]')).click();
      expect(browser.getCurrentUrl()).toEqual('https://issuu.com/gayleperry/docs/snac_janfeb2017_ver2.sm');

    });

    // it('Verify that the user is logged in', function () {
    //   // Make sure user is signed out first
    //   signout();
    //   // Sign in
    //   browser.get('http://localhost:3000/authentication/signin');
    //   // Enter UserName
    //   element(by.model('vm.credentials.usernameOrEmail')).sendKeys(user1.username);
    //   // Enter Password
    //   element(by.model('vm.credentials.password')).sendKeys(user1.password);
    //   // Click Submit button
    //   element(by.css('button[type="submit"]')).click();
    //   expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/');
    // });

  });

});
