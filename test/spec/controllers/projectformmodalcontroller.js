'use strict';

describe('Controller: ProjectformmodalcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('tangentSolutionsAssessmentApp'));

  var ProjectformmodalcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProjectformmodalcontrollerCtrl = $controller('ProjectformmodalcontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProjectformmodalcontrollerCtrl.awesomeThings.length).toBe(3);
  });
});
