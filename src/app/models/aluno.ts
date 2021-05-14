import { Usuario } from './usuario';

export interface Aluno extends Usuario {
    formacao: string;
    idade: number;
}
