(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('firebaseDataService', firebaseDataService);

  firebaseDataService.$inject = ['FIREBASE_URL'];

  function firebaseDataService(FIREBASE_URL  ) {
    var root = new Firebase(FIREBASE_URL);

    var service = {
      root: root,
      users: root.child('users'),
      emails: root.child('emails'),
      textMessages: root.child('textMessages'),
      oldTerritories: root,
      territories: root.child('territories'),
      addresses: root.child('addresses'),
      checkOuts: root.child('checkOuts')
    };

    return service;        
  }

})();