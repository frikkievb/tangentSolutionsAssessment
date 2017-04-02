'use strict';

/**
 * @ngdoc service
 * @name tangentSolutionsAssessmentApp.AuthProvider
 * @description
 * # AuthProvider
 * Provider in the tangentSolutionsAssessmentApp.
 */

(function(){

  function AuthProvider(){

    var vm = this;
    vm.authUrl = null;


    vm.setAuthUrl = function(url) {
      vm.authUrl = url;
    }

    vm.$get =[Authentication];
    // return {
    //   setAuthUrl: setAuthUrl,
    //   $get: [Authentication]
    // };


    function Authentication() {

      return {}
      // function logout() {
      //   // return $http.post(vm.logoutUrl,{access_token:$localStorage.accessToken})
      //   //   .then(function(){
      //   //     $localStorage.$reset();
      //   //     return $q.resolve();
      //   //   });
      // }
      //
      // function login(username,password) {
      //   console.log("LOGGED IN",username,password);
      // }
      //
      // return ({
      //   login: login,
      //   logout:logout
      // });
    }


  }

  angular.module('tangentSolutionsAssessmentApp')
    .provider('AuthProvider',AuthProvider);

})();

