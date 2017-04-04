'use strict';

/**
 * @ngdoc service
 * @name tangentSolutionsAssessmentApp.projectService
 * @description
 * # projectService
 * Service in the tangentSolutionsAssessmentApp.
 */

(function(){

  function ProjectService(Restangular,$sessionStorage,$http,CONFIG){

    var vm = this;

    var moduleURL = "projects/";

    var projects = Restangular.all(moduleURL);



    vm.token = $sessionStorage.token
    function all(){
      return projects.getList()
    }

    function create(project){
      return Restangular.one(moduleURL);
    }
    function removeSingle(projectID){
      return $http.delete(CONFIG.apiUrl+"projects/"+projectID+"/")
    }
    return {
      all:all,
      removeSingle:removeSingle,
      create:create
    }

  }

  ProjectService.$inject = ['Restangular','$sessionStorage',"$http","CONFIG"];
  angular.module('tangentSolutionsAssessmentApp')
    .service('projectService', ProjectService);


})()
