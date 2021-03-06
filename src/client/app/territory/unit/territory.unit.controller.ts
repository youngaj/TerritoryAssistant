
namespace app.territory {
    'use strict';

    interface ITerritoryUnitVm {
        territory: Territory;
    }

    export class TerritoryUnitController implements ITerritoryUnitVm {
        territory: Territory = new Territory();
        territoryTypes: Array<any> =  [];
        languages: Array<string> = ["English", "Spanish", "French"];
        visitStates: Array<string> = ["Not Home", "Interested", "No Trespassing", "Locked"];
        addresses: AngularFireArray;
        visableAddresses: AngularFireArray;
        checkOutId:number;
        unit:string;
        //addresses:any;

        static $inject: Array<string> = ['$scope', '$stateParams', 'logger', 'TerritoryService', 'AddressService', 'firebaseDataService'];
        constructor(private $scope: ng.IScope, public $stateParams:any, private logger: blocks.logger.Logger, 
                    public territoryService: TerritoryService, public addressService: AddressService, firebaseDataService: any, _:any) {
            let num = $stateParams.num;
            this.unit = $stateParams.unit;
            this.checkOutId = $stateParams.checkout;
            let vm = this;
            $scope.$watchCollection('vm.addresses', (newValue, oldValue) => {
                if (angular.isDefined(newValue)){
                    vm.logger.info("vm.addresses updated", newValue);
                    vm.logger.log(newValue);
                    vm.visableAddresses = vm.filterAddresses(num, vm.unit, newValue);  
                }
            });

            this.getByNum(num).then(function (data:Territory){
                vm.territory = data;
            });
            addressService.getAll().then(function (data: AngularFireArray){
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
        
        public saveVisit(address:Address, visit:Visit, checkOutId:string){            
            visit.checkOutId = checkOutId;
            visit.date = Date.now();
            address.lastVisit = visit;
            if(!address.visits)
                address.visits = [];
            address.visits = address.visits.concat(visit);
            var vm = this;
            vm.addresses.$save(address).then(function(){
               vm.logger.log("Visit saved", visit); 
            });
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
                   return address.territoryNum == num && address.unit == unit;
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
