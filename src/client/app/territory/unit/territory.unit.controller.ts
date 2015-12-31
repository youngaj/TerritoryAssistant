namespace app.territory {
    'use strict';

    interface ITerritoryUnitVm {
        territory: Territory;
    }

    export class TerritoryUnitController implements ITerritoryUnitVm {
        territory: Territory = new Territory();
        territoryTypes: Array<any> =  [];

        static $inject: Array<string> = ['$stateParams', 'logger', 'TerritoryService'];
        constructor($stateParams:any, private logger: blocks.logger.Logger, public territoryService: TerritoryService) {
            let num = $stateParams.num;
            let vm = this;
            this.getByNum(num).then(function (data:Territory){
                logger.info("Get by Num returns ", data);
                vm.territory = data;
            });
            this.territoryTypes = territoryService.territoryTypes;
        }

        public goToDetail(territory:Territory) {
            this.territoryService.goToDetail(territory.num);
        }

        public goToList() {
            this.territoryService.goToList();
        }
        
        getByNum(num: string) {
            let vm = this;
            return this.territoryService.getAll().then(function (list:any){                
                let foundTerritory = vm.territoryService.getByNum(list, num);
                return foundTerritory;
            });
        }
        
        save(territory:Territory){
            return this.territoryService.save(territory);
        }
    }

    angular
        .module('app.territory')
        .controller('TerritoryUnitController', TerritoryUnitController);
}
