'use strict';

describe('Controller: ConfirmdeletemodalcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('tangentSolutionsAssessmentApp'));

  var ConfirmdeletemodalcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConfirmdeletemodalcontrollerCtrl = $controller('ConfirmdeletemodalcontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ConfirmdeletemodalcontrollerCtrl.awesomeThings.length).toBe(3);
  });
});
