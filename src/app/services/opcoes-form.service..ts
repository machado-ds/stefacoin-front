import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class OpcoesFormService {

    constructor() {}

    getPerfis() {
        return [
            {valor: '1', desc: 'Professor'},
            {valor: '2', desc: 'Aluno'}
        ]
    }
}