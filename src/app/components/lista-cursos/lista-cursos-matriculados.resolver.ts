import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Aluno } from 'src/app/models/aluno';
import { Curso } from 'src/app/models/curso';
import { AlunoService } from 'src/app/services/aluno.service';
import { AuthService } from 'src/app/services/auth.service';
import { CursoService } from 'src/app/services/curso.service';

@Injectable({ providedIn: 'root' })
export class ListaCursosAlunoMatriculadoResolver implements Resolve<Observable<Curso[]>> {

    constructor(
        private cursoService: CursoService,
        private alunoService: AlunoService,
        private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Curso[]>  {
        const alunoId = this.authService.getUsuario().id;
        return this.cursoService.getCursosAlunoMatriculado(alunoId);
    }
}