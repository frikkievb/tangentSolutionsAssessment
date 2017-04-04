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

  function config($stateProvider, $httpProvider, $urlRouterProvider, CONFIG, RestangularProvider,$resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = true;
    RestangularProvider.setRequestSuffix('/');
    RestangularProvider.setRestangularFields({
      id: "pk"
    });
    // AuthProvider.setAuthUrl("http://userservice.staging.tangentmicroservices.com/api-token-auth/");
    RestangularProvider.setBaseUrl(CONFIG.apiUrl);
    RestangularProvider.setErrorInterceptor(function (response, deferred, responseHandler) {
      //Overrides the default "id" field for Restangular with 'pk'.
      RestangularProvider.configuration.getIdFromElem = function (elem) {
        // if route is customers ==> returns customerID
        console.log(elem);
        return elem["pk"];
      };
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

    $urlRouterProvider.otherwise('/login');
  }

  function RootController($scope, $state, $sessionStorage, authService) {
    var vm = this;
    vm.appName = 'Tangent App';
    vm.user = 1;

    vm.logout = function () {
      authService.logout()
        .then(function () {
          $state.go("login");
        })
    }
    vm.navigate = function (state) {
      $state.go(state);
    };

    $scope.$watch(function () {
      return $sessionStorage.token;
    }, function (newVal, oldVal) {

      $scope.token = newVal;

    })

  }

  function run($rootScope, $sessionStorage, $state,Restangular) {

    // Restangular.configuration.getIdFromElem = function( elem ){
    //   return elem["pk"];
    // };
    $rootScope.$on("$stateChangeSuccess", function (ev, to, toParams, from, fromParams) {
      if (!$sessionStorage.token && !$sessionStorage.user) {
        $state.go("login");
      }
    })
  }

  RootController.$inject = ['$scope', '$state', '$sessionStorage', 'authService'];
  config.$inject = ['$stateProvider', '$httpProvider', '$urlRouterProvider', 'CONFIG', 'RestangularProvider','$resourceProvider'];
  run.$inject = ['$rootScope', '$sessionStorage', '$state','Restangular'];
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
      'smart-table',
      'restangular'
    ])
    .config(config)
    .run(run)
    .constant("CONFIG", configuration)
    .controller('RootController', RootController)
    .filter('myStrictFilter', function ($filter) {
      return function (input, predicate) {
        return $filter('filter')(input, predicate, true);
      }
    })
    .filter('unique', function () {
      return function (arr, field) {
        var o = {}, i, l = arr.length, r = [];
        for (i = 0; i < l; i += 1) {
          o[arr[i][field]] = arr[i];
        }
        for (i in o) {
          r.push(o[i]);
        }
        return r;
      };
    })


})();
