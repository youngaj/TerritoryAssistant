namespace app.territory{
    export interface IAddress {
        
    }
    
    export class Address implements IAddress {
        num: string;
        street: string;
        unit: string;
        territoryNum:string;
        lastVisit:Visit;
        visits: Array<Visit>;
        Language: Array<string>
    }
    
    export class Visit{
        checkOutId: number;
        date: Date;
        state: string;
        language: string;
        notes: string;
    }
}