import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mensagem } from '../models/mensagem';
import { Professor } from '../models/professor';

const API = environment.API;

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
  constructor(private http: HttpClient) {}

  // #pegabandeira
  listar(): Observable<Professor[]> {
    return this.http.get<Professor[]>(API + '/stefanini/professores');
  }

  obter() {}

  alterar(professorId:number, professor: Professor): Observable<Mensagem> {
    return this.http.put<Mensagem>(API + '/stefanini/professores/' + professorId, professor);
  }

  excluir() {}

  getProfessorById(idProfessor: number) {
    return this.http.get<Professor>(API + '/stefanini/professores/' + idProfessor);
}

}
