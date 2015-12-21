namespace app.territory {
  'use strict';

  interface ITerritoryVm {
    title: string;
  }
  
  export class TerritoryController2 implements ITerritoryVm {
    title: string = 'Territory';
    territories: Array<any> = [];
    
    
    static $inject: Array<string> = ['$state', 'logger', '$firebaseArray', 'firebaseDataService'];
    constructor(private $state: ng.ui.IStateService, private logger: blocks.logger.Logger, public $firebaseArray:any, public firebaseDataService:any) {
      this.logger.info('Activated Territory View');
      // this.territories = firebaseDataService.getMockData();
      this.territories = $firebaseArray(firebaseDataService.territories.child('territories'));
    }
    
    public goToDetail(num:number){
        this.logger.info('Button clicked ' + num);
        console.log("button clicked");
        this.$state.go('territoryDetail', {id:num});
        this.logger.info("Should be going to detail page");
    }
        
  }

  angular
    .module('app.territory')
    .controller('TerritoryController', TerritoryController2);
}
