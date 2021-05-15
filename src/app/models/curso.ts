import { Aula } from './aula';
import { Avaliacao } from './avaliacao';

export interface Curso {
    nome: string;
    descricao: string;
    idProfessor?: number;
    aulas?: Aula[];
    alunosMatriculados?: number[];
    avaliacao?: Avaliacao[];
}