/* jshint -W117, -W030 */
describe('Territory Detail Controller', function () {
  var controller;

  beforeEach(function () {
    bard.appModule('firebase');  
    bard.appModule('ui.router');  
    bard.appModule('app.territory');
    bard.inject('$controller', '$state', '$log', '$rootScope', '$firebaseArray','firebaseDataService');
  });

  beforeEach(function () {
    var $scope = $rootScope.$new();
    controller = $controller('TerritoryDetailController',
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

    describe('goToList', function () {
        it('should go to the territory list page', function() {
            controller.goToList();
            $rootScope.$apply();
            expect($state.current.name).to.equal("territory");
            // expect($state.href(state, { id: 1 })).toEqual('#/state/1');
        });
     });

    describe('goToUnit', function () {
        it('should go to unit page', function() {
            controller.goToUnit("3", "3");
            $rootScope.$apply();
            console.log($state);
            expect($state.current.name).to.equal("territoryUnit");
            // expect($state.href(state, { id: 1 })).toEqual('#/state/1');
        });
     });

  });
  
  
});
