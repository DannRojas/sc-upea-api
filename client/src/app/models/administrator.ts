import { PeopleInterface } from './people';

export interface AdministratorInterface{
    id_administrador?: string;
    tipo?: string;
    username?: string;
    password?: string;
    email?: string;
    ci_persona?: string;
    persona?: PeopleInterface;
}