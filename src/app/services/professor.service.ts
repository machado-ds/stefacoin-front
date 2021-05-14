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
  listar(filtro: Partial<Professor>): Observable<Professor[]> {
    return this.http.get<Professor[]>(API);
  }

  obter() {}

  incluir(professor: Professor): Observable<Mensagem> {
    return this.http.post<Mensagem>(API, professor);
  }

  alterar() {}

  excluir() {}

  getProfessorById(idProfessor: number) {
    return this.http.get<Professor>(API + '/stefanini/professores/' + idProfessor);
}

}
