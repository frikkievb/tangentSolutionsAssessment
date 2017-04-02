'use strict';

/**
 * @ngdoc function
 * @name tangentSolutionsAssessmentApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the tangentSolutionsAssessmentApp
 */

(function(){
  function LoginCtrl(authService,$sessionStorage,$state){
    var vm = this;
    vm.loginForm = null;
    vm.credentials = {
      username:null,
      password:null
    };

    vm.login = function(){
      authService.login(vm.credentials.username,vm.credentials.password)
          .then(function(res){

            $sessionStorage.token = res.data.token;
            $state.go("projects");
          })
    };

  }

  LoginCtrl.$inject = ['authService','$sessionStorage','$state'];
  angular.module('tangentSolutionsAssessmentApp')
    .controller('LoginCtrl', LoginCtrl);


})();
