namespace app.territory {
  'use strict';

  interface ITerritoryVm {
    title: string;
  }
  
  export class TerritoryController2 implements ITerritoryVm {
    title: string = 'Territory';
    territories: Array<any> = [];
    
    
    static $inject: Array<string> = ['$state', 'logger', 'TerritoryService'];
    constructor(private $state: ng.ui.IStateService, private logger: blocks.logger.Logger, public territoryService:TerritoryService) {
      //this.logger.info('Activated Territory View');
      let vm = this;
      territoryService.getAll().then(function (data:any){
          vm.territories = data;
      });
    }
    
    public goToDetail(num:number){
        //this.logger.info('Button clicked ' + num);
        this.territoryService.goToDetail(num);
        // console.log("button clicked");
        // this.$state.go('territoryDetail', {id:num});
        // this.logger.info("Should be going to detail page");
    }
        
  }

  angular
    .module('app.territory')
    .controller('TerritoryController', TerritoryController2);
}
