namespace app.territory {
    'use strict';

    export class TerritoryService {
        territories: any;
        territoryTypes: Array<any>;

        static $inject: Array<string> = ['$state', 'logger', '$firebaseArray', 'firebaseDataService', '$firebaseObject'];
        constructor(private $state: ng.ui.IStateService, private logger: blocks.logger.Logger, 
                    public $firebaseArray: AngularFireArrayService, public firebaseDataService: any,  public $firebaseObject: AngularFireObjectService) {
            this.territoryTypes = [
                {label:'All', value:undefined},
                {label:'Apartment', value:'Apartment', unit:'Building'},
                {label:'Residential', value:'Residential', unit:'Block'},
                {label:'Business', value:'Business', unit:'Block'},
                {label:'Letter', value:'Letter'}
            ];
        }

        goToDetail(num: string) {
            this.$state.go('territoryDetail', { num: num });
        }
        
        goToUnit(num: string, unit:string, checkout:number){
            this.logger.info("Hello From GoToUnit");
            this.$state.go('territoryUnit', { num: num, unit:unit, checkout:checkout });            
        }

        getAll() {
            return this.$firebaseArray(this.firebaseDataService.territories).$loaded();
        }

        getByNum(data:any, num: string) {
            let i = 0;
            for (i = 0; i < data.length; i++) {
                if (data[i].num === num) {
                    return data[i];
                }
            }
            let territory = new Territory();
            territory.num = num;
            return territory;
        }

        goToList() {
            this.$state.go("territory");
        }

        save(territory: Territory) {
            let vm = this;
            this.logger.info("territory ", territory);
            var ref = this.firebaseDataService.territories.child(territory.num);
            var obj = this.$firebaseObject(ref);
            obj = this.parseTerritory(obj, territory)
            return obj.$save();
        }
                
        private parseTerritory(original:any, updated:Territory){
            original.num = ValueOrDefault(updated.num, '1');
            original.status = ValueOrDefault(updated.status, 'Avaiable');
            original.type = ValueOrDefault(updated.type, '');;
            original.description = ValueOrDefault(updated.description, '');
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