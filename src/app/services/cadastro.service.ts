import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.API;

@Injectable({
    providedIn: 'root'
})
export class CadastroService {

    constructor(private http: HttpClient) { }

    checarEmailDisponivel(email: string) {
        return this.http.post(API + '/stefanini/usuarios/disponivel', { email });
    }
}