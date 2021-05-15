import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Aluno } from '../models/aluno';
import { Mensagem } from '../models/mensagem';
import { Professor } from '../models/professor';
import { Usuario } from '../models/usuario';

const API = environment.API;

@Injectable({
    providedIn: 'root'
})
export class CadastroService {

    constructor(private http: HttpClient) { }

    checarEmailDisponivel(email: string) {
        return this.http.post(API + '/stefanini/usuarios/disponivel', { email });
    }

    cadastrarUsuario(usuario: Usuario): Observable<Mensagem> {
        return this.http.post<Mensagem>(API + '/stefanini/usuarios', usuario);
    }
}