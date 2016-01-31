namespace app.territory {
	'use strict';
	
	interface ITerritory{
		num: string;
        description: string;
		units: Array<string>;
		status: string;
        type: TerritoryType;
	}
		
	export class Territory implements ITerritory {
		num: string;
        description: string;
		units: Array<string>;
		status: string;
        type: TerritoryType;
        
        constructor(){
            this.units = [];
            this.status = "Avaiable";
            this.type = new TerritoryType();
        }	
	}
                
    export class TerritoryType{
        label:string;
        value: string;
        unit: Unit;   
    }
        
}