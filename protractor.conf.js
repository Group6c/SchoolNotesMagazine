'use strict';

// Protractor configuration
var config = {
  specs: ['modules/*/tests/e2e/*.js'],
  plugins : [{
      path: 'node_modules/protractor-istanbul-plugin',
      logAssertions: true,
      failAssertions: true
    }]
};

exports.config = config;
