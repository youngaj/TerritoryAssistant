namespace app.territory {
  'use strict';

    export class TerritoryService {
        territories: Array<any> = [];
    
        static $inject: Array<string> = ['$state', 'logger', '$firebaseArray', 'firebaseDataService'];
        constructor(private $state: ng.ui.IStateService, private logger: blocks.logger.Logger, public $firebaseArray:any, public firebaseDataService:any) {
            this.logger.info('Activated Territory View');
            this.territories = $firebaseArray(firebaseDataService.territories.child('territories'));
        }
        
        goToDetail(num:number){
            this.logger.info('Going to Territory Detail Page ' + num);
            this.$state.go('territoryDetail', {id:num});
        }
        
        getAll(){
            return this.territories;
        }
        
        goToList(){
            this.$state.go("territory",{});
        }
    }
    
    angular
        .module('app.territory')
        .service('TerritoryService', TerritoryService);

}