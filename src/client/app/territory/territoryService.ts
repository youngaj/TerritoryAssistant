namespace app.territory {
  'use strict';

    export class TerritoryService {
        territories: Array<any> = [];
    
        static $inject: Array<string> = ['$state', 'logger', '$firebaseArray', 'firebaseDataService'];
        constructor(private $state: ng.ui.IStateService, private logger: blocks.logger.Logger, public $firebaseArray:any, public firebaseDataService:any) {
            //this.logger.info('Activated Territory View');
            this.territories = $firebaseArray(firebaseDataService.territories.child('territories')).$loaded().then(function (data:any){
                console.log(data);
            });
        }
        
        goToDetail(num:number){
            //this.logger.info('Going to Territory Detail Page ' + num);
            this.$state.go('territoryDetail', {id:num});
        }
        
        getAll(){
            return this.$firebaseArray(this.firebaseDataService.territories.child('territories')).$loaded();
        }
        
        getByNum(num:string){
            return this.getAll().then(function (data:any){
                console.log("Hello World by Num "+ num);
                console.log("Before get by Num", data);
                let territory = new Territory();
                let i = 0;
                for(i= 0; i < data.length; i++){
                    //console.log(data[i]);
                    if(data[i].num === num){
                        console.error("Found it");
                       return data[i]; 
                    }
                }
                return territory;                
            });
        }
        
        goToList(){
            this.$state.go("territory",{});
        }
    }
    
    angular
        .module('app.territory')
        .service('TerritoryService', TerritoryService);

}