namespace app.territory{
    export interface IAddress {
        
    }
    
    export class Address implements IAddress {
        num: string;
        street: string;
        unit: Unit;
        visits: Array<Visit>;
        Language: Array<string>
    }
    
    class Visit{
        date: Date;
        state: string
    }

    class LanguageEntry{
        language: string;
        date: Date;
    }
}