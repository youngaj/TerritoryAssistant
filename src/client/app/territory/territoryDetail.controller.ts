namespace app.territory {
  'use strict';

  interface ITerritoryDetailVm {
    territory:Territory;
  }
  
  export class TerritoryDetailController implements ITerritoryDetailVm {
    territory: Territory = new Territory();
    
    static $inject: Array<string> = ['logger', '$firebaseArray', 'firebaseDataService'];
    constructor(private logger: blocks.logger.Logger, public $firebaseArray:any, public firebaseDataService:any) {
      this.logger.info('Activated Territory View');
      
    }        
  }

  angular
    .module('app.territory')
    .controller('TerritoryDetailController', TerritoryDetailController);
}
