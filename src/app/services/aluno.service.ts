import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Aluno } from '../models/aluno';

const API = environment.API;

@Injectable({
    providedIn: 'root'
})
export class AlunoService {
    constructor(private http: HttpClient) {}

    getAlunoById(idAluno: number) {
        return this.http.get<Aluno>(API + '/stefanini/alunos/' + idAluno);
    }

    checaAlunoMatriculadoEmCurso(idAluno: number, idCurso: number) {
        
    }
}