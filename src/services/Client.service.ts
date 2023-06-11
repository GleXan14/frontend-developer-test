
import type { IFilters } from '@/models/filter';
import { HomeClient, type IClientsData } from '@/models/homeClient';
import axios from 'axios';

export default class ClientService{

    static async getClients(): Promise<HomeClient[]>{
        const url = "http://localhost:3000/clients";
        const result = await axios.get(url);
        const clients = result.data.map((item:any) => new HomeClient().deserialize(item));
        return clients;
    }


    static async getClientsByFilters(filters:IFilters): Promise<IClientsData>{
        const url = "http://localhost:3000/clients";
        const params:{[K:string]:any} = {};

        if(filters.query && filters.query.length > 0) params['q'] = filters.query;
        if(filters.page) params['_page'] = filters.page;
        if(filters.limit) params['_limit'] = filters.limit;
        if(filters.sort) params['_sort'] = filters.sort.join(',');
        if(filters.order) params['_order'] = filters.order.join(',');

        const result = await axios.get(url, {params});
        const clients = result.data.map((item:any) => new HomeClient().deserialize(item));
        
        const clientsData: IClientsData = {
            clients,
            count: Number(result.headers["x-total-count"])
        }
        return clientsData;
    }
}