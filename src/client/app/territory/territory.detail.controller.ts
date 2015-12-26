namespace app.territory {
    'use strict';

    interface ITerritoryDetailVm {
        territory: Territory;
    }

    export class TerritoryDetailController implements ITerritoryDetailVm {
        territory: Territory = new Territory();
        territoryTypes: Array<string> =  [undefined,'Apartment', 'Business', 'Residential']

        static $inject: Array<string> = ['$stateParams', 'logger', 'TerritoryService'];
        constructor($stateParams:any, private logger: blocks.logger.Logger, public territoryService: TerritoryService) {
            let num = $stateParams.num;
            let vm = this;
            //this.logger.info('Activated Territory View');
            this.getByNum(num).then(function (data:any){
                vm.territory = data;    
                console.log("Get by Num returns ",vm.territory);
            });
        }

        checkIn(territory:Territory, checkout: Checkout){
            this.territoryService.checkIn(territory, checkout);
        }

        checkOut(territory:Territory){
            let currUser = {id: 1, name: "Andre"};
            this.territoryService.checkOut(currUser, territory);
        }

        public goToList() {
            //this.logger.info("go to list called");
            this.territoryService.goToList();
        }

        getByNum(num: string) {
            this.logger.info("get by num -> " + num);
            return this.territoryService.getByNum(num);
        }
        
        save(territory:Territory){
            return this.territoryService.save(territory);
        }
    }

    angular
        .module('app.territory')
        .controller('TerritoryDetailController', TerritoryDetailController);
}
