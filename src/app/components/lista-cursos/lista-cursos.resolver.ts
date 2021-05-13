import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';

@Injectable({ providedIn: 'root' })
export class ListaCursosResolver implements Resolve<Observable<Curso[]>> {

    constructor(private cursoService: CursoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Curso[]>  {
        return this.cursoService.getCursos();
    }
}