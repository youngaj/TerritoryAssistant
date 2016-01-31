namespace app.territory {
	'use strict';
	
	interface ITerritory{
		num: string;
		units: Array<string>;
		status: string;
        type: TerritoryType;
        checkouts: Array<Checkout>;		
	}
		
	export class Territory implements ITerritory {
		num: string;
		units: Array<string>;
		status: string;
        type: TerritoryType;
        checkouts: Array<Checkout>;	
        
        constructor(){
            this.units = [];
            this.checkouts = [];
            this.status = "Avaiable";
            this.type = new TerritoryType();
        }	
	}
            
    export class Checkout {
        id: number;
        isActive: boolean;
        publisher: string;
        dateOut: number;
        dateIn: number;
    }
    
    export class TerritoryType{
        label:string;
        value: string;
        unit: Unit;   
    }
        
}