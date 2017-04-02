'use strict';

/**
 * @ngdoc function
 * @name tangentSolutionsAssessmentApp.controller:ProjectsctrlCtrl
 * @description
 * # ProjectsctrlCtrl
 * Controller of the tangentSolutionsAssessmentApp
 */

(function () {

  function ProjectsCtrl(projects) {
    var vm = this;
    vm.projects = projects;
    console.log(projects);

  }

  ProjectsCtrl.$inject = ['projects'];
  angular.module('tangentSolutionsAssessmentApp')
    .controller('ProjectsCtrl', ProjectsCtrl);


})();
