import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, first, map, switchMap } from 'rxjs/operators';
import { CursoService } from './curso.service';

@Injectable({
    providedIn: 'root'
})
export class NomeCursoDisponivelValidatorService {

    constructor(private cursoService: CursoService) {}

    checarNomeCursoDisponivel() {
        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(nomeCurso =>
                    this.cursoService.checarNomeCursoDisponivel(nomeCurso)
                ))
                .pipe(map(disponivel => disponivel ? null : { nomeCursoIndisponivel: true }))
                .pipe(first());
        }
    }
}