'use strict';

describe('Controller: TasksmodalcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('tangentSolutionsAssessmentApp'));

  var TasksmodalcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TasksmodalcontrollerCtrl = $controller('TasksmodalcontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TasksmodalcontrollerCtrl.awesomeThings.length).toBe(3);
  });
});
