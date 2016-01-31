/* jshint -W117, -W030 */
describe('TerritoryController', function () {
  var controller;

  beforeEach(function () {
    bard.appModule('firebase');  
    bard.appModule('ui.router');  
    bard.appModule('app.territory');
    bard.inject('$controller', '$state', '$log', '$rootScope', '$firebaseArray','firebaseDataService', 'TerritoryService');
  });

  beforeEach(function () {
    var $scope = $rootScope.$new();
    controller = $controller('TerritoryController',
    {
        $scope: $scope
    });        
    $rootScope.$apply(); 
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Territory controller', function () {
    it('should be created successfully', function () {
      expect(controller).to.be.defined;
    });

    describe('goToDetail', function () {
        it('should go to detail page', function() {
            controller.goToDetail(3);
            console.log($state);
            $rootScope.$apply();
            expect($state.current.name).to.equal("territoryDetail");
            // expect($state.href(state, { id: 1 })).toEqual('#/state/1');
        });
     });
  });
  
  
});
