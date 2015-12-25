namespace app.territory {
  'use strict';

  interface ITerritoryDetailVm {
    territory:Territory;
  }
  
  export class TerritoryDetailController implements ITerritoryDetailVm {
    territory: Territory = new Territory();
    
    static $inject: Array<string> = ['logger', 'TerritoryService'];
    constructor(private logger: blocks.logger.Logger, public territoryService:TerritoryService) {
      this.logger.info('Activated Territory View');
    }
    
    public goToList(){
        this.logger.info("go to list called");
        this.territoryService.goToList();       
    }
  }

  angular
    .module('app.territory')
    .controller('TerritoryDetailController', TerritoryDetailController);
}
