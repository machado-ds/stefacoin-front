import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Avaliacao } from '../models/avaliacao';
import { Curso } from '../models/curso';
import { Mensagem } from '../models/mensagem';

const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private http: HttpClient) { }

  cadastraCurso(curso: Curso): Observable<Mensagem> {
    return this.http.post<Mensagem>(API + '/stefanini/cursos', curso);
  }

  editaCurso(cursoId: number, curso: Curso): Observable<Mensagem> {
    return this.http.put<Mensagem>(API + '/stefanini/cursos/' + cursoId, curso);
  }

  getCursos() {
    return this.http.get<Curso[]>(API + '/stefanini/cursos');
  }

  getCursoById(cursoId: number) {
    return this.http.get<Curso>(API + '/stefanini/cursos/' + cursoId);
  }

  getCursosAlunoMatriculado(alunoId: number) {
    return this.http.get<Curso[]>(API + '/stefanini/alunos/' + alunoId + '/cursos');
  }

  matricula(alunoId: number, cursoId: number): Observable<Mensagem> {
    return this.http.put<Mensagem>(`${API}/stefanini/cursos/${cursoId}/matricula?alunoId=${alunoId}`, {});
  }

  cancelarMatricula(alunoId: number, cursoId: number): Observable<Mensagem> {
    console.log('Chamando cancela matricula da service');
    return this.http.put<Mensagem>(`${API}/stefanini/cursos/${cursoId}/cancelarMatricula?alunoId=${alunoId}`, {});
  }

  registraAvaliacao(cursoId: number, avaliacao: Avaliacao): Observable<Mensagem> {
    return this.http.put<Mensagem>(`${API}/stefanini/cursos/${cursoId}/avaliar`, avaliacao);
  }

  checarNomeCursoDisponivel(nomeCurso: string) {
    return this.http.post(API + '/stefanini/cursos/nome-disponivel', { nomeCurso });
  }

  excluirCurso(cursoId: number): Observable<Mensagem> {
    return this.http.delete<Mensagem>(API + '/stefanini/cursos/' + cursoId);
  }
}
