'use strict';

/**
 * @ngdoc service
 * @name tangentSolutionsAssessmentApp.authService
 * @description
 * # authService
 * Service in the tangentSolutionsAssessmentApp.
 */

(function(){

  function AuthService($http,$q){
      var vm = this;

      function login(username,password){
        return $http.post("http://userservice.staging.tangentmicroservices.com/api-token-auth/",{username:username,password:password})

      }

      return{
        login:login
      }
  }

  AuthService.$inject = ['$http','$q'];
  angular.module('tangentSolutionsAssessmentApp')
    .service('authService', AuthService);

})();

