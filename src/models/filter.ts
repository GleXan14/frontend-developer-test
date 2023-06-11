

export type SortOrder = 'asc' | 'desc';

export interface IFilters{
    query?:string;
    page?:number;
    limit?:number;
    sort?:string[];
    order?: SortOrder[];
}