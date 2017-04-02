'use strict';

describe('Service: authProvider', function () {

  // instantiate service
  var authProvider,
    init = function () {
      inject(function (_authProvider_) {
        authProvider = _authProvider_;
      });
    };

  // load the service's module
  beforeEach(module('tangentSolutionsAssessmentApp'));

  it('should do something', function () {
    init();

    expect(!!authProvider).toBe(true);
  });

  it('should be configurable', function () {
    module(function (authProviderProvider) {
      authProviderProvider.setSalutation('Lorem ipsum');
    });

    init();

    expect(authProvider.greet()).toEqual('Lorem ipsum');
  });

});
