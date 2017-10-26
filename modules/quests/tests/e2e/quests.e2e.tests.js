'use strict';

describe('Quests E2E Tests:', function () {
  describe('Test Quests page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/quests');
      expect(element.all(by.repeater('quest in quests')).count()).toEqual(0);
    });
  });
});
