'use strict';

/**
 * @ngdoc service
 * @name tangentSolutionsAssessmentApp.authService
 * @description
 * # authService
 * Service in the tangentSolutionsAssessmentApp.
 */

(function(){

  function AuthService($http,$q,$sessionStorage){
      var vm = this;

      function login(username,password){
        return $http.post("http://userservice.staging.tangentmicroservices.com/api-token-auth/",{username:username,password:password})

      }

      function logout(){
        $sessionStorage.$reset();
        return $q.resolve();
      }

      return{
        login:login,
        logout:logout
      }
  }

  AuthService.$inject = ['$http','$q','$sessionStorage'];
  angular.module('tangentSolutionsAssessmentApp')
    .service('authService', AuthService);

})();

