namespace app.territory {
    'use strict';

    interface ITerritoryDetailVm {
        territory: Territory;
    }

    export class TerritoryDetailController implements ITerritoryDetailVm {
        territory: Territory = new Territory();
        territoryTypes: Array<any> =  [];
        state = {
            isHistoryDisplayed:false
        };

        static $inject: Array<string> = ['$stateParams', 'logger', 'TerritoryService'];
        constructor($stateParams:any, private logger: blocks.logger.Logger, public territoryService: TerritoryService) {
            let num = $stateParams.num;
            let vm = this;
            //this.logger.info('Activated Territory View');
            this.getByNum(num).then(function (data:Territory){
                data.units = [
                    "1","2","3","4","5","6"
                ];
                vm.territory = data;
            });
            this.territoryTypes = territoryService.territoryTypes;
        }

        checkIn(territory:Territory, checkout: Checkout){
            this.territoryService.checkIn(territory, checkout);
        }

        checkOut(territory:Territory){
            let currUser = {id: 1, name: "Andre"};
            this.territoryService.checkOut(currUser, territory);
        }

        public goToList() {
            //this.logger.info("go to list called");
            this.territoryService.goToList();
        }
        
        public goToUnit(num:string, unit:string, checkout:number){
            this.territoryService.goToUnit(num, unit, checkout);
        }

        getByNum(num: string) {
            let vm = this;
            return this.territoryService.getAll().then(function (list:any){                
                return vm.territoryService.getByNum(list, num);    
                console.log("Get by Num returns ",vm.territory);
            });
        }
        
        save(territory:Territory){
            return this.territoryService.save(territory);
        }
    }

    angular
        .module('app.territory')
        .controller('TerritoryDetailController', TerritoryDetailController);
}
