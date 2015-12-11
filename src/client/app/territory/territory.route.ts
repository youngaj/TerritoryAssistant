namespace app.territory {
  'use strict';

  angular
    .module('app.territory')
    .config(configureStates);

  configureStates.$inject = ['$stateProvider'];
  /* @ngInject */
  function configureStates($stateProvider: ng.ui.IStateProvider) {
    var states = getStates();
    states.forEach(function(state) {
      $stateProvider.state(state.state, state.config);
    });
  }

  function getStates() {
    return [
      {
        state: 'territory',
        config: {
          url: '/territory',
          templateUrl: 'app/territory/territory.html',
          //controller: 'TerritoryController',
          //`controllerAs: 'vm',
          title: 'territory',
          settings: {
            nav: 1,
            content: '<i class="fa fa-territory"></i> Territory'
          }
        }
      }
    ];
  }
}
