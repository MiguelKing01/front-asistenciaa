export interface AsistenciaModel{
    id?: number;
    date: Date;
    user_id: number,
    session_id: number;
    status: number;
    user: {
        first_name: string;
        last_name: string;
    }
}