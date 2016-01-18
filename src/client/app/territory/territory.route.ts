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
          templateUrl: 'app/territory/list/territory.list.html',
          controller: 'TerritoryController',
          controllerAs: 'vm',
          title: 'Territory'
        }
      },
      {
        state: 'territoryDetail',
        config: {
          url: '/territory/:num',
          templateUrl: 'app/territory/detail/territory.detail.html',
          controller: 'TerritoryDetailController',
          controllerAs: 'vm',
          title: 'Territory Detail'
        }
      },
      {
        state: 'territoryUnit',
        config: {
          url: '/territory/:num/Unit/:unit/CheckOut/:checkout',
          templateUrl: 'app/territory/unit/territory.unit.html',
          controller: 'TerritoryUnitController',
          controllerAs: 'vm',
          title: 'Territory Unit'
        }
      }
    ];
  }
}
