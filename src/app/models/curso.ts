import { Aluno } from './aluno';
import { Aula } from './aula';

export interface Curso {
    nome: string;
    descricao: string;
    idProfessor?: number;
    //Tenho que ver se vou mudar esse array para guardar os IDs ao invés dos objetos. No caso de Aula, estou em dúvida porque uma Aula não existe fora de um curso...
    aulas?: Aula[];
    alunosMatriculados?: number[];
    avaliacao?: number;
}