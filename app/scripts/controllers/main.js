'use strict';

/**
 * @ngdoc function
 * @name tangentSolutionsAssessmentApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tangentSolutionsAssessmentApp
 */

(function(){

  function MainController(){
    var vm = this;
    vm.appName = 'Tangent App';
    vm.user = 1;
    console.log('hier');
  }
  angular.module('tangentSolutionsAssessmentApp')
    .controller('MainCtrl', MainController);


})();

