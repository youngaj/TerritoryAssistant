namespace app.territory {
  'use strict';

  interface ITerritoryVm {
    title: string;
  }
  
  export class TerritoryController implements ITerritoryVm {
    title: string = 'Territory';
    territories: Array<any> = [];
    
    static $inject: Array<string> = ['logger', '$firebaseArray', 'firebaseDataService'];
    constructor(private logger: blocks.logger.Logger, public $firebaseArray:any, public firebaseDataService:any) {
      this.logger.info('Activated Territory View');
      debugger;
      // this.territories = firebaseDataService.getMockData();
      this.territories = $firebaseArray(firebaseDataService.territories.child('territories'));
    }
        
  }

  angular
    .module('app.territory')
    .controller('TerritoryController', TerritoryController);
}
