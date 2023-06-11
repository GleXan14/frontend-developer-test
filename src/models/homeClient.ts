

export interface IHomeClient{
    personNumber:number;
    type:string;
    street:string;
    number:string;
    sector:string;
    province:string;
    state: 'Activo' | 'Inactivo';
}

export interface IClientsData{
    clients: HomeClient[];
    count: number;
}

export class HomeClient{
    personNumber:number;
    type:string;
    street:string;
    number:string;
    sector:string;
    province:string;
    state: 'Activo' | 'Inactivo';

    constructor(){
        this.personNumber = 306;
        this.type = '';
        this.street = '';
        this.number = '';
        this.sector = '';
        this.province = '';
        this.state = 'Activo';
    }

    deserialize(input:any):this{
        Object.assign(this, input);
        return this;
    }
}