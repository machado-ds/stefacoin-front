import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Aluno } from '../models/aluno';
import { Professor } from '../models/professor';

const API = environment.API;

@Injectable({
    providedIn: 'root'
})
export class CadastroService {

    constructor(private http: HttpClient) { }

    checarEmailDisponivel(email: string) {
        return this.http.post(API + '/stefanini/usuarios/disponivel', { email });
    }

    cadastrarProfessor(professor: Professor) {
        return this.http.post(API + '/stefanini/professores', professor);
    }

    cadastrarAluno(aluno: Aluno) {
        return this.http.post(API + '/stefanini/alunos', aluno);
    }
}