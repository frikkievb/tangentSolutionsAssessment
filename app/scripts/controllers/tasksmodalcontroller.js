'use strict';

/**
 * @ngdoc function
 * @name tangentSolutionsAssessmentApp.controller:ProjectformmodalcontrollerCtrl
 * @description
 * # ProjectformmodalcontrollerCtrl
 * Controller of the tangentSolutionsAssessmentApp
 */

(function () {

  function TasksModalController(tasks, $uibModalInstance) {
    var vm = this;

    vm.tasks = tasks;



    vm.ok = function () {

      $uibModalInstance.dismiss('cancel');

    }

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };


  }

  TasksModalController.$inject = ["tasks", "$uibModalInstance"];

  angular.module('tangentSolutionsAssessmentApp')
    .controller('TasksModalController', TasksModalController);

})()

