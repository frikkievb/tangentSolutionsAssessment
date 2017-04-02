'use strict';

describe('Service: authentication', function () {

  // instantiate service
  var authentication,
    init = function () {
      inject(function (_authentication_) {
        authentication = _authentication_;
      });
    };

  // load the service's module
  beforeEach(module('tangentSolutionsAssessmentApp'));

  it('should do something', function () {
    init();

    expect(!!authentication).toBe(true);
  });

  it('should be configurable', function () {
    module(function (authenticationProvider) {
      authenticationProvider.setSalutation('Lorem ipsum');
    });

    init();

    expect(authentication.greet()).toEqual('Lorem ipsum');
  });

});
