namespace app.territory {
  'use strict';

  interface ITerritoryVm {
    title: string;
  }
  
  export class TerritoryController implements ITerritoryVm {
    title: string = 'Territory';
    territories: Array<any> = [];
    filteredTerritories: Array<Territory> = [];
    territoryTypes: Array<any> = [];
    
    static $inject: Array<string> = ['$state', 'logger', 'TerritoryService'];
    constructor(private $state: ng.ui.IStateService, private logger: blocks.logger.Logger, public territoryService:TerritoryService) {
      //this.logger.info('Activated Territory View');
      let vm = this;
      this.territoryTypes = territoryService.territoryTypes;
      territoryService.getAll().then(function (data:any){
          vm.territories = data;
          vm.filteredTerritories = data;
      });
    }
    
    filterTerritory(type:string){
        let vm = this;
        this.territoryService.getAll().then(function (data:any){
            vm.filteredTerritories = data.filter( (territory:Territory) => {
                return angular.isUndefined(type) || territory.type.label === type;
            })  
        });   
    }
    
    public goToDetail(num:string){
        this.territoryService.goToDetail(num);
    }
        
   public add(territoryNum:string){
       this.territoryService.goToDetail(territoryNum);
   }
  }

  angular
    .module('app.territory')
    .controller('TerritoryController', TerritoryController);
}
