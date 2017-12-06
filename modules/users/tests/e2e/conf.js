exports.config = {
  framework: 'jasmine',
  // seleniumAddress: 'http://localhost:3000',
  specs: [
  'users.e2e.tests.js',
  'submissions.tests.js'
  ]
}

// module.exports = function(config) {
//   config.set({
//     basePath: '',
//     frameworks: ['jasmine'],
//     files: [
//       '*.js',
//       'test/spec/*.js'
//     ],
//     browsers: ['PhantomJS'],
//     singleRun: true,
//     reporters: ['progress', 'coverage'],
//     preprocessors: { '*.js': ['coverage'] }
//   });
// };