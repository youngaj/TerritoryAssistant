namespace app.territory {
	'use strict';
	
	interface ITerritory{
		num: string;
		units: Array<Unit>;
		status: string;		
	}
		
	export class Territory implements ITerritory {
		num: string;
		units: Array<Unit>;
        status: string;
	}
	
	interface IUnit{
		type: string;
		name: string;
	}
	
	export /**
	 * Unit
	 */
	class Unit implements IUnit {
		type: string;
		name: string;
		
		constructor() {
			
		}
	}
}