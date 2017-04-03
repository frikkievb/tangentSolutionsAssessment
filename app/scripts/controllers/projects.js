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

    vm.currentTasks = {};

    vm.showTasks = function(tasks){
      vm.currentTasks = tasks;
      $('#tasksModal').modal('show');
    }

  }

  ProjectsCtrl.$inject = ['projects'];
  angular.module('tangentSolutionsAssessmentApp')
    .controller('ProjectsCtrl', ProjectsCtrl);


})();
