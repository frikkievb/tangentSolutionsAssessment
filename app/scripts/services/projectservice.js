'use strict';

/**
 * @ngdoc service
 * @name tangentSolutionsAssessmentApp.projectService
 * @description
 * # projectService
 * Service in the tangentSolutionsAssessmentApp.
 */

(function(){

  function ProjectService(Restangular){

    var vm = this;
    var moduleURL = "/projects/";
    var moduleAPI = Restangular.all(moduleURL);


    function all(){
      return moduleAPI.getList()
    }

    return {
      all:all
    }

  }

  ProjectService.$inject = ['Restangular'];
  angular.module('tangentSolutionsAssessmentApp')
    .service('projectService', ProjectService);


})()
