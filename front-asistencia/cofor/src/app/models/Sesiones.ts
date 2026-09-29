export interface SesionesModel{
    id?: number;
    date: string;
    day: number,
    id_group: number;
    status: number;
    group: {
        id_group: number;
        access_code_group: string;
    }
}