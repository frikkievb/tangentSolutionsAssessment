'use strict';

/**
 * @ngdoc function
 * @name tangentSolutionsAssessmentApp.controller:ProjectformmodalcontrollerCtrl
 * @description
 * # ProjectformmodalcontrollerCtrl
 * Controller of the tangentSolutionsAssessmentApp
 */

(function () {

  function ProjectFormModalController(project, $uibModalInstance,$filter) {
    var vm = this;

    vm.project = project;

    vm.project.start_date = new Date(vm.project.start_date);
    vm.project.end_date = new Date(vm.project.end_date);
    vm.dateOptions = {
      dateDisabled: false,
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1
    };

    vm.startDate = {
      opened: false
    }
    vm.openStartDate = function() {
      vm.startDate.opened = true;
    };

    vm.endDate = {
      opened: false
    }
    vm.openEndDate = function() {
      vm.endDate.opened = true;
    };

    vm.ok = function () {

      vm.project.start_date = $filter('date')(vm.project.start_date,'yyyy-MM-dd');

      vm.project.end_date = $filter('date')(vm.project.end_date,'yyyy-MM-dd');
      $uibModalInstance.close(vm.project);
    }

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    function formatDate(value)
    {
      return value.getYear() +"-"+value.getMonth()+1 + "-" + value.getDate();
    }
  }

  ProjectFormModalController.$inject = ["project", "$uibModalInstance","$filter"];

  angular.module('tangentSolutionsAssessmentApp')
    .controller('ProjectFormModalController', ProjectFormModalController);

})()

