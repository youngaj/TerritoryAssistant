namespace app.territory {
    'use strict';

    export class CheckOutService {
        checkOuts: any;

        static $inject: Array<string> = ['$state', 'logger', '$firebaseArray', 'firebaseDataService', '$firebaseObject', 'TerritoryService'];
        constructor(private $state: ng.ui.IStateService, private logger: blocks.logger.Logger, 
                    public $firebaseArray: AngularFireArrayService, public firebaseDataService: any,
                    public $firebaseObject: AngularFireObjectService, public territoryService:TerritoryService) {
        }

        checkOut(user: any, territory: Territory, checkOutCount: number) {
            let vm = this;
            let checkout = new CheckOut();
            let nextCheckoutId = checkOutCount + 1;
            checkout.id = territory.num + "_" + nextCheckoutId;
            checkout.dateOut = Date.now();
            checkout.publisher = user.name;
            checkout.isActive = true;
            checkout.territoryNum = territory.num;
            
            territory.status = "Checked Out";
            this.logger.info("territory", territory);
            this.logger.info("checkout", checkout);
            return this.add(checkout).then(function(){;
                vm.territoryService.save(territory);
                vm.logger.success(user.name + " checking out Territory", checkout);
            });
        }
        
        checkIn(territory: Territory, checkout: any) {
            checkout.dateIn = Date.now();
            checkout.isActive = false;            
            territory.status = "Available";
            let vm = this;
            return this.update(checkout.$id, checkout).then(function(){;
                vm.territoryService.save(territory);
                vm.logger.success(" check in Territory");
            });
        }
        
        add(checkOut:CheckOut){
            return this.$firebaseArray(this.firebaseDataService.checkOuts).$add(checkOut);
        }
        
        update(key:string, checkout:CheckOut){
            let vm = this;
            var ref = this.firebaseDataService.checkOuts.child(key);
            var obj = this.$firebaseObject(ref);
            obj = this.parseCheckout(obj, checkout);
            return obj.$save();
        }
        
        parseCheckout(original:any, updated:CheckOut){
            original.id = ValueOrDefault(updated.id, '1');
            original.territoryNum = ValueOrDefault(updated.territoryNum, '');
            original.isActive = ValueOrDefault(updated.isActive, true);;
            original.publisher = ValueOrDefault(updated.publisher, '');
            original.dateOut = ValueOrDefault(updated.dateOut, '');
            original.dateIn = ValueOrDefault(updated.dateIn, '');

            function ValueOrDefault(value:any, fallback:any){
                return angular.isDefined(value) ? value : fallback;
            }
            return original;
        }

        goToDetail(num: string) {
            this.$state.go('territoryDetail', { num: num });
        }
        
        goToUnit(num: string, unit:string, checkout:number){
            this.$state.go('territoryUnit', { num: num, unit:unit, checkout:checkout });            
        }

        getAll() {
            return this.$firebaseArray(this.firebaseDataService.checkOuts).$loaded();
        }

        goToList() {
            this.$state.go("territory");
        }        
    }

    angular
        .module('app.territory')
        .service('CheckOutService', CheckOutService);

}