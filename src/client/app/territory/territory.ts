namespace app.territory {
	'use strict';
	
	interface ITerritory{
		num: string;
		units: Array<Unit>;
		status: string;
        type: TerritoryType;
        checkouts: Array<Checkout>;		
	}
		
	export class Territory implements ITerritory {
		num: string;
		units: Array<Unit>;
		status: string;
        type: TerritoryType;
        checkouts: Array<Checkout>;		
	}
            
    export class Checkout {
        publisher: string;
        dateOut: number;
        dateIn: number;
    }
        
    enum TerritoryType {
        Business,
        Residential,
        Appartment
    }
}