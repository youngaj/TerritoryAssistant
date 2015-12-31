namespace app.territory {    	
    interface IUnit{
		type: string;
		name: string;
	}
	
	export class Unit implements IUnit {
		type: string;
		name: string;
		
		constructor() {
			
		}
	}

}