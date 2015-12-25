namespace app.territory {
    'use strict';

    interface ITerritoryDetailVm {
        territory: Territory;
    }

    export class TerritoryDetailController implements ITerritoryDetailVm {
        territory: Territory = new Territory();

        static $inject: Array<string> = ['logger', 'TerritoryService'];
        constructor(private logger: blocks.logger.Logger, public territoryService: TerritoryService) {
            let num = '42';
            let vm = this;
            //this.logger.info('Activated Territory View');
            this.getByNum(num).then(function (data:any){
                vm.territory = data;    
                console.log("Get by Num returns ",vm.territory);
            });
        }

        public goToList() {
            //this.logger.info("go to list called");
            this.territoryService.goToList();
        }

        getByNum(num: string) {
            this.logger.info("get by num -> " + num);
            return this.territoryService.getByNum(num);
        }
    }

    angular
        .module('app.territory')
        .controller('TerritoryDetailController', TerritoryDetailController);
}
