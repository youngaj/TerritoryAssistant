
namespace app.territory {
    'use strict';

    interface ITerritoryUnitVm {
        territory: Territory;
    }

    export class TerritoryUnitController implements ITerritoryUnitVm {
        territory: Territory = new Territory();
        territoryTypes: Array<any> =  [];
        addresses: AngularFireArray;
        visableAddresses: AngularFireArray;
        //addresses:any;

        static $inject: Array<string> = ['$scope', '$stateParams', 'logger', 'TerritoryService', 'firebaseDataService'];
        constructor(private $scope: ng.IScope, public $stateParams:any, private logger: blocks.logger.Logger, public territoryService: TerritoryService, firebaseDataService: any, _:any) {
            let num = $stateParams.num;
            let unit = $stateParams.unit;
            let checkout = $stateParams.checkout;
            let vm = this;
            $scope.$watch('vm.addresses', (newValue, oldValue) => {
                if (angular.isDefined(newValue)){
                    vm.logger.info("vm.addresses updated");
                    vm.visableAddresses = vm.filterAddresses(num, unit, newValue);                  
                }
            }, true);

            this.getByNum(num).then(function (data:Territory){
                vm.territory = data;
            });
            territoryService.getAddresses().then(function (data: AngularFireArray){
               vm.addresses = data;               
            });
            this.territoryTypes = territoryService.territoryTypes;            
        }

        private addAddressWatcher($scope :ng.IScope, vm:TerritoryUnitController){
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
        
        private filterAddresses(num:string, unit:string, list:any){
             return list.filter(function(address:Address){
                   return address.num == num || address.unit == unit;
               });
        }
        
        saveAddress(address:Address, addresses:AngularFireArray){
            var vm = this;
            return addresses.$add(angular.copy(address)).then(function (){
                vm.logger.info("Appended to address list " + vm.addresses.length);
                addresses.$save(angular.copy(address));
            });
        }        
    }

    angular
        .module('app.territory')
        .controller('TerritoryUnitController', TerritoryUnitController);
}
