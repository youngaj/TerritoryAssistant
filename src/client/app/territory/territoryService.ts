namespace app.territory {
    'use strict';

    export class TerritoryService {
        territories: any;

        static $inject: Array<string> = ['$state', 'logger', '$firebaseArray', 'firebaseDataService'];
        constructor(private $state: ng.ui.IStateService, private logger: blocks.logger.Logger, public $firebaseArray: any, public firebaseDataService: any) {
            //this.logger.info('Activated Territory View');
        }

        checkOut(user: any, territory: Territory) {
            let vm = this;
            let checkout = new Checkout();
            checkout.dateOut = Date.now();
            checkout.publisher = user.name;

            this.getByNum(territory.num).then(function(record: any) {
                if (angular.isUndefined(record.checkouts)) {
                    record.checkouts = [];
                }
                record.checkouts.push(checkout);
                record.status = "Checked_Out";
                vm.territories.$save(record);
                vm.logger.success(user.name + " checking out Territory");
            });
        }

        checkIn(territory: Territory, checkout: Checkout) {
            let vm = this;
            checkout.dateIn = Date.now();

            this.getByNum(territory.num).then(function(record: any) {
                if (angular.isUndefined(record.checkouts)) {
                    record.checkouts = [];
                }
                record.checkouts = record.checkouts.map(function(entry:Checkout) {
                    if (angular.isUndefined(entry.dateIn)) {
                        entry.dateIn = checkout.dateIn;
                    }
                    return entry;
                });
                record.status = "Checked_In";
                vm.territories.$save(record);
                vm.logger.success(" check in Territory");
            });
        }

        goToDetail(num: number) {
            //this.logger.info('Going to Territory Detail Page ' + num);
            this.$state.go('territoryDetail', { num: num });
        }

        getAll() {
            return this.$firebaseArray(this.firebaseDataService.territories.child('territories')).$loaded();
        }

        getByNum(num: string) {
            let vm = this;
            return this.getAll().then(function(data: any) {
                vm.territories = data;
                let territory = new Territory();
                let i = 0;
                for (i = 0; i < data.length; i++) {
                    if (data[i].num === num) {
                        return data[i];
                    }
                }
                return territory;
            });
        }

        goToList() {
            this.$state.go("territory");
        }

        save(territory: Territory) {
            let vm = this;
            this.getByNum(territory.num).then(function(record: any) {
                record = vm.parseTerritory(record, territory);
                vm.territories.$save(record);                
                vm.logger.success("Saving Territory");
            });
            
        }
        
        private parseTerritory(original:Territory, updated:Territory){
            original.checkouts = ValueOrDefault(updated.checkouts, []);
            original.num = ValueOrDefault(updated.num, '1');
            original.status = ValueOrDefault(updated.status, 'Avaiable');
            original.type = ValueOrDefault(updated.type, '');;
            original.units = ValueOrDefault(updated.units, []);

            function ValueOrDefault(value:any, fallback:any){
                return angular.isDefined(value) ? value : fallback;
            }
            return original;
        }
        
    }

    angular
        .module('app.territory')
        .service('TerritoryService', TerritoryService);

}