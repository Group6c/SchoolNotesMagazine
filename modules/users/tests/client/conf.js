exports.config = {
  framework: 'jasmine',
  // seleniumAddress: 'http://localhost:3000',
  specs: [
  'authentication.client.controller.tests.js',
  'edit-profile.client.controller.tests.js',
  'password-validator.client.directive.tests.js',
  'password-verify.client.directive.tests.js',
  'password.client.controller.tests.js',
  'users-admin.client.routes.tests.js',
  'users.client.routes.tests.js'
  ]
}