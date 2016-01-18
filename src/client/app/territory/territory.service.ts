namespace app.territory {
    'use strict';

    export class TerritoryService {
        territories: any;
        territoryTypes: Array<any>;

        static $inject: Array<string> = ['$state', 'logger', '$firebaseArray', 'firebaseDataService'];
        constructor(private $state: ng.ui.IStateService, private logger: blocks.logger.Logger, 
                    public $firebaseArray: AngularFireArrayService, public firebaseDataService: any) {
            this.territoryTypes = [
                {label:'All', value:undefined},
                {label:'Apartment', value:'Apartment', unit:'Building'},
                {label:'Residential', value:'Residential', unit:'Block'},
                {label:'Business', value:'Business', unit:'Block'},
                {label:'Letter', value:'Letter'}
            ];
        }

        checkOut(user: any, territory: Territory) {
            let vm = this;
            let checkout = new Checkout();
            checkout.dateOut = Date.now();
            checkout.publisher = user.name;
            
            territory = this.ensureCheckoutIsDefined(territory);
            checkout.id = territory.checkouts.length+1;
            territory.checkouts.push(checkout);
            territory.status = "Checked Out";
            this.save(territory);
            vm.logger.success(user.name + " checking out Territory");
        }
        
        private ensureCheckoutIsDefined(territory:Territory){
            if (angular.isUndefined(territory.checkouts)) {
                territory.checkouts = [];
            }
            return territory;
        }

        checkIn(territory: Territory, checkout: Checkout) {
            checkout.dateIn = Date.now();
            territory = this.ensureCheckoutIsDefined(territory);
            territory.checkouts = territory.checkouts.map(function(entry:Checkout) {
                if (angular.isUndefined(entry.dateIn)) {
                    entry.dateIn = checkout.dateIn;
                }
                return entry;
            });
            territory.status = "Available";
            this.save(territory);

            this.logger.success(" check in Territory");
        }

        goToDetail(num: string) {
            this.$state.go('territoryDetail', { num: num });
        }
        
        goToUnit(num: string, unit:string, checkout:number){
            this.logger.info("Hello From GoToUnit");
            this.$state.go('territoryUnit', { num: num, unit:unit, checkout:checkout });            
        }

        getAddresses() {
            return this.$firebaseArray(this.firebaseDataService.addresses.child('addresses')).$loaded();
        }

        getAll() {
            return this.$firebaseArray(this.firebaseDataService.territories.child('territories')).$loaded();
        }

        getByNum(data:any, num: string) {
            let vm = this;
            let territory = new Territory();
            let i = 0;
            for (i = 0; i < data.length; i++) {
                if (data[i].num === num) {
                    return data[i];
                }
            }
            return territory;
        }

        goToList() {
            this.$state.go("territory");
        }

        save(territory: Territory) {
            let vm = this;
            this.getAll().then(function (data:any){
                let record = vm.getByNum(data, territory.num);
                record = vm.parseTerritory(record, territory);
                data.$save(record);                
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