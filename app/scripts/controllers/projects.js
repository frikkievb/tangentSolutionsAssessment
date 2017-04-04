'use strict';

/**
 * @ngdoc function
 * @name tangentSolutionsAssessmentApp.controller:ProjectsctrlCtrl
 * @description
 * # ProjectsctrlCtrl
 * Controller of the tangentSolutionsAssessmentApp
 */

(function () {

  function ProjectsCtrl(projects,projectService,$uibModal,Restangular) {
    var vm = this;
    vm.projects = projects;

    vm.currentTasks = {};


    vm.editProject = function(project,size, parentSelector) {
      var parentElem = parentSelector ?
        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/projectformmodal.html',
        controller: 'ProjectFormModalController',
        controllerAs: 'projectFormModalCtrl',
        size: size,
        appendTo: parentElem,
        resolve: {
          project: function () {
            return Restangular.copy(project);
          }
        }
      })


      modalInstance.result.then(function (newProject) {
        newProject.save()
          .then(function(res){
            var index = vm.projects.indexOf(project);
            vm.projects.splice(index,1);
            vm.projects.push(newProject);

          })
      }, function () {

      });
    }
    vm.addProject = function(size, parentSelector) {
      var parentElem = parentSelector ?
        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/projectformmodal.html',
        controller: 'ProjectFormModalController',
        controllerAs: 'projectFormModalCtrl',
        size: size,
        appendTo: parentElem,
        resolve: {
          project: function () {
            return projectService.create();
          }
        }
      })


      modalInstance.result.then(function (newProject) {
        newProject.save()
          .then(function(){

              vm.projects.push(newProject);

          })
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    }
    vm.deleteProject = function(project,size,parentSelector){
      var parentElem = parentSelector ?
        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/confirmdeletemodal.html',
        controller: 'ConfirmDeleteModalController',
        controllerAs: 'confirmDeleteModalCtrl',
        size: size,
        appendTo: parentElem,
        resolve: {
          project: function () {
            return project;
          }
        }
      })

      modalInstance.result.then(function () {
        projectService.removeSingle(project.pk)
          .then(function(){
            var index = vm.projects.indexOf(project);
            vm.projects.splice(index,1);
          })
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });

    }
    vm.showTasks = function(tasks,size,parentSelector){

      var parentElem = parentSelector ?
        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/tasksmodal.html',
        controller: 'TasksModalController',
        controllerAs: 'tasksModalCtrl',
        size: size,
        appendTo: parentElem,
        resolve: {
          tasks: function () {
            return Restangular.copy(tasks);
          }
        }
      })

    }

  }

  ProjectsCtrl.$inject = ['projects','projectService','$uibModal','Restangular'];
  angular.module('tangentSolutionsAssessmentApp')
    .controller('ProjectsCtrl', ProjectsCtrl);


})();
