namespace app.territory {
    'use strict';

    interface ITerritoryDetailVm {
        territory: Territory;
    }

    export class TerritoryDetailController implements ITerritoryDetailVm {
        territory: Territory = new Territory();
        private checkOuts:Array<CheckOut> = [];
        territoryCheckOuts:Array<CheckOut> = [];
        territoryTypes: Array<any> =  [];
        state = {
            isHistoryDisplayed:false
        };

        static $inject: Array<string> = ['$stateParams', '$scope', 'logger', 'TerritoryService', 'CheckOutService'];
        constructor($stateParams: any, private $scope: ng.IScope, private logger: blocks.logger.Logger, private territoryService: TerritoryService, private checkOutService: CheckOutService) {
            let num = $stateParams.num;
            let vm = this;
            //this.logger.info('Activated Territory View');
            this.setUpWatchers($scope, num);
            this.getCheckOuts()
            this.getByNum(num).then(function(data: Territory) {
                data.units = [
                    "1", "2", "3", "4", "5", "6"
                ];
                vm.territory = data;
            });
            this.territoryTypes = territoryService.territoryTypes;
        }
        
        private getCheckOuts() {
            let vm = this;
            this.checkOutService.getAll().then(function(checkOutData: any) {
                vm.checkOuts = checkOutData;
            });
        }
        
        private setUpWatchers($scope: ng.IScope, num:string){
            let vm = this;
            $scope.$watchCollection('vm.checkOuts', (newValue, oldValue) => {
                if (angular.isDefined(newValue)) {
                    vm.logger.log(newValue);
                    vm.territoryCheckOuts = vm.filterCheckOuts(num, newValue);
                }
            });
        }

        private filterCheckOuts(territoryNum:string, allCheckOuts:Array<CheckOut>){
            var filteredCheckOuts:Array<CheckOut> = [];
            angular.forEach(allCheckOuts, function(checkOut: CheckOut) {
                if (checkOut.territoryNum === territoryNum)
                    filteredCheckOuts.push(checkOut);
            }); 
            return filteredCheckOuts;
        }

        checkIn(territory:Territory, checkout: CheckOut){
            this.checkOutService.checkIn(territory, checkout);
        }

        checkOut(territory:Territory){
            let currUser = {id: 1, name: "Andre"};
            this.checkOutService.checkOut(currUser, territory, this.territoryCheckOuts.length);
        }

        public goToList() {
            this.territoryService.goToList();
        }
        
        public goToUnit(num:string, unit:string, checkout:number){
            this.territoryService.goToUnit(num, unit, checkout);
        }

        getByNum(num: string) {
            let vm = this;
            return this.territoryService.getAll().then(function (list:any){                
                
                let territory: Territory = vm.territoryService.getByNum(list, num);
                if(!angular.isDefined(territory)){
                    territory = new Territory();
                    territory.num = num;
                }   
                return territory;
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
