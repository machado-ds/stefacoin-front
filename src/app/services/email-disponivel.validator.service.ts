import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, first, map, switchMap } from 'rxjs/operators';
import { CadastroService } from './cadastro.service';

@Injectable({
    providedIn: 'root'
})
export class EmailDisponivelValidatorService {

    constructor(private cadastroService: CadastroService) {}

    checarEmailDisponivel() {
        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(email =>
                    this.cadastroService.checarEmailDisponivel(email)
                ))
                .pipe(map(disponivel => disponivel ? null : { emailIndisponivel: true }))
                .pipe(first());
        }
    }
}