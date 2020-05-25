export interface InscriptionInterface{
    id_inscripcion?: number;
    capacitacionId?: number;
    personaId?: number;
    fecha_insc?: Date;
    m_cancelado?: number; 
}

export interface InscriptionPeopleInterface{
    id_inscripcion?: number;
    capacitacionId?: number;
    personaId?: number;
    fecha_insc?: Date;
    m_cancelado?: number;
    ci?: string;
    nombres?: string;
    apellidos?: string;
    tipo?: string;
}