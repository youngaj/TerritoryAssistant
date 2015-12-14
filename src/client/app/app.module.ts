namespace app {
  'use strict';

  angular.module('app', [
     // Third party modules.
    'firebase',
    
    'app.core',
    'app.widgets',
    'app.admin',
    'app.dashboard',
    'app.layout',
    'app.territory'
  ]);
}
