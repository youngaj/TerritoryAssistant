namespace app.territory {
    'use strict';

    export class AddressService {
        addresses: any;

        static $inject: Array<string> = ['$state', 'logger', '$firebaseArray', 'firebaseDataService', '$firebaseObject'];
        constructor(private $state: ng.ui.IStateService, private logger: blocks.logger.Logger, 
                    public $firebaseArray: AngularFireArrayService, public firebaseDataService: any,  public $firebaseObject: AngularFireObjectService) {
        }

        getAll() {
            return this.$firebaseArray(this.firebaseDataService.addresses).$loaded();
        }

        save(address: Address) {
            let vm = this;
            this.logger.info("address ", address);
            var ref = this.firebaseDataService.addresses.child(address.num);
            var obj = this.$firebaseObject(ref);
            obj = this.parseAddress(obj, address)
            return obj.$save();
        }
                
        private parseAddress(original:any, updated:Address){
            original.num = ValueOrDefault(updated.num, '1');
            original.status = ValueOrDefault(updated.street, 'Avaiable');
            original.type = ValueOrDefault(updated.territoryNum, '');;
            original.description = ValueOrDefault(updated.unit, '');

            function ValueOrDefault(value:any, fallback:any){
                return angular.isDefined(value) ? value : fallback;
            }
            return original;
        }
        
    }

    angular
        .module('app.territory')
        .service('AddressService', AddressService);

}