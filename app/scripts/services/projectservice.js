'use strict';

/**
 * @ngdoc service
 * @name tangentSolutionsAssessmentApp.projectService
 * @description
 * # projectService
 * Service in the tangentSolutionsAssessmentApp.
 */

(function(){

  function ProjectService(Restangular,$sessionStorage){

    var vm = this;
    var moduleURL = "/projects/";
    var moduleAPI = Restangular.all(moduleURL);

    vm.token = $sessionStorage.token
    function all(){
      return moduleAPI.getList()
    }

    return {
      all:all
    }

  }

  ProjectService.$inject = ['Restangular','$sessionStorage'];
  angular.module('tangentSolutionsAssessmentApp')
    .service('projectService', ProjectService);


})()
