'use strict';

/**
 * @ngdoc overview
 * @name tangentSolutionsAssessmentApp
 * @description
 * # tangentSolutionsAssessmentApp
 *
 * Main module of the application.
 */
(function () {

  var configuration = {
    apiUrl: "http://projectservice.staging.tangentmicroservices.com/api/v1/"
  }

  function config($stateProvider, $httpProvider, $urlRouterProvider, CONFIG, RestangularProvider) {

    // AuthProvider.setAuthUrl("http://userservice.staging.tangentmicroservices.com/api-token-auth/");
    RestangularProvider.setBaseUrl(CONFIG.apiUrl);
    RestangularProvider.setErrorInterceptor(function (response, deferred, responseHandler) {

      if (response.status === 403) {
        refreshAccesstoken().then(function () {
          // Repeat the request and then call the handlers the usual way.
          $http(response.config).then(responseHandler, deferred.reject);
          // Be aware that no request interceptors are called this way.
        });

        return false; // error handled
      }


      return true; // error not handled
    });

    //Overrides the default "id" field for Restangular.  This will concatenate the resource name + "ID"
    RestangularProvider.configuration.getIdFromElem = function (elem) {
      // if route is customers ==> returns customerID
      return elem[_.initial(elem.route).join('') + "ID"];
    };


    $httpProvider.interceptors.push(['$q', '$location', '$sessionStorage', function ($q, $location, $sessionStorage) {

      return {
        'request': function (config) {
          config.headers = config.headers || {};

          if ($sessionStorage.token) {
            config.headers.Authorization = 'Token ' + $sessionStorage.token;
          }

          return config;

        }
        ,
        'responseError': function (response) {
          if (response.status === 401 || response.status === 403 || response.status === 404 || response.status === 400) {

            if (response.status !== 404) {
              $localStorage.$reset();
              window.location.replace('#/login?error=' + response.data.message)
            }
          }
          return $q.reject(response);
        }
      };
    }]);

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'loginCtrl'
      })
      .state("projects", {
        url: "/projects",
        templateUrl: "views/projects.html",
        controller: "ProjectsCtrl",
        controllerAs: 'projectsCtrl',

        resolve: {
          "projects": ["projectService", function (projectService) {
            return projectService.all();
          }]
        }
      })

    $urlRouterProvider.otherwise('/home');
  }

  function RootController($state) {
    var vm = this;
    vm.appName = 'Tangent App';
    vm.user = 1;

    vm.navigate = function (state) {
      $state.go(state);
    };

  }

  function run($rootScope, $sessionStorage,$state) {


    $rootScope.$watch(function(){
      return $sessionStorage.token;
    },function(newVal,oldVal){
      if(!angular.equals(newVal,oldVal)){
        $rootScope.token = newVal;
      }
    })
    $rootScope.$on("$stateChangeSuccess", function (ev, to, toParams, from, fromParams) {
      if (!$sessionStorage.token && !$sessionStorage.user) {
        $state.go("login");
      }
    })
  }

  RootController.$inject = ['$state'];
  config.$inject = ['$stateProvider', '$httpProvider', '$urlRouterProvider', 'CONFIG', 'RestangularProvider'];
  run.$inject = ['$rootScope', '$sessionStorage','$state'];
  angular
    .module('tangentSolutionsAssessmentApp', [
      'ngAnimate',
      'ngAria',
      'ngCookies',
      'ngMessages',
      'ngResource',
      'ngStorage',
      'ngSanitize',
      'ngTouch',
      'ui.router',
      'ui.bootstrap',
      'restangular'
    ])
    .config(config)
    .run(run)
    .constant("CONFIG", configuration)
    .controller('RootController', RootController);


})();
