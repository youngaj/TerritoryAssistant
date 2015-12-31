namespace app.territory {
	'use strict';
	
	interface ITerritory{
		num: string;
		units: Array<string>;
		status: string;
        type: string;
        checkouts: Array<Checkout>;		
	}
		
	export class Territory implements ITerritory {
		num: string;
		units: Array<string>;
		status: string;
        type: string;
        checkouts: Array<Checkout>;	
        
        constructor(){
            this.units = [];
            this.checkouts = [];
            this.type = "Avaiable";
        }	
	}
            
    export class Checkout {
        publisher: string;
        dateOut: number;
        dateIn: number;
    }
        
}