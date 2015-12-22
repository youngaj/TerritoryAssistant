namespace app.territory {
	'use strict';
	
	interface ITerritory{
		num: string;
		units: Array<Unit>;
		status: TerritoryStatus;
        type: TerritoryType;
        checkouts: Array<Checkout>;		
	}
		
	export class Territory implements ITerritory {
		num: string;
		units: Array<Unit>;
		status: TerritoryStatus;
        type: TerritoryType;
        checkouts: Array<Checkout>;		
	}
	
    class TerritoryStatus{
        name: string;        
    }
    
    export class Checkout {
        publisher: string;
        dateOut: Date;
        dateIn: Date;
    }
    
    enum TerritoryType {
        Business,
        Residential,
        Appartment
    }
}