
namespace app.territory {
    'use strict';

    interface ITerritoryUnitVm {
        territory: Territory;
    }

    export class TerritoryUnitController implements ITerritoryUnitVm {
        territory: Territory = new Territory();
        territoryTypes: Array<any> =  [];
        //addresses: AngularFireArray;
        addresses:any;

        static $inject: Array<string> = ['$stateParams', 'logger', 'TerritoryService', 'firebaseDataService'];
        constructor($stateParams:any, private logger: blocks.logger.Logger, public territoryService: TerritoryService, firebaseDataService: any) {
            let num = $stateParams.num;
            let vm = this;
            this.getByNum(num).then(function (data:Territory){
                logger.info("Get by Num returns ", data);
                vm.territory = data;
            });
            territoryService.getAddresses().then(function (data: any){
               vm.addresses = data; 
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
        
        saveAddress(address:Address){
            this.logger.info("Save Address function called ", address);
            this.addresses.$add(angular.copy(address));
            this.logger.info("Appended to address list " + this.addresses.length);
            this.addresses.$save(angular.copy(address));
        }
    }

    angular
        .module('app.territory')
        .controller('TerritoryUnitController', TerritoryUnitController);
}
