export interface GruposModel{
    id_group?: number;
    access_code_group: string;
    id_subjects: number;
    id_promotion: number;
    id_programs: number;
    status_group: number;
    subjects: {
        name_subjects: string;
    };
    promotion: {
        name_promotion: string;
    };
    programs: {
        name: string;
    }
}