'use strict';

/**
 * @ngdoc function
 * @name tangentSolutionsAssessmentApp.controller:ConfirmdeletemodalcontrollerCtrl
 * @description
 * # ConfirmdeletemodalcontrollerCtrl
 * Controller of the tangentSolutionsAssessmentApp
 */

(function () {

  function ConfirmDeleteModalController(project, $uibModalInstance) {
    var vm = this;
    vm.project = project;
    vm.ok = function () {

      $uibModalInstance.close();
    }

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }

  ConfirmDeleteModalController.$inject = ['project', '$uibModalInstance'];
  angular.module('tangentSolutionsAssessmentApp')
    .controller('ConfirmDeleteModalController', ConfirmDeleteModalController);
})()

