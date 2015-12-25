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
          url: '/',
          templateUrl: 'app/territory/territory.html',
          controller: 'TerritoryController',
          controllerAs: 'vm',
          title: 'Territory'
        }
      },
      {
        state: 'territoryDetail',
        config: {
          url: '/territory/:id',
          templateUrl: 'app/territory/territory.detail.html',
          controller: 'TerritoryDetailController',
          controllerAs: 'vm',
          title: 'Territory Detail'
        }
      }
    ];
  }
}
