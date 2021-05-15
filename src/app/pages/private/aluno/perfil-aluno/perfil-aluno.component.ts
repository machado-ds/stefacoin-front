import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Aluno } from 'src/app/models/aluno';
import { Curso } from 'src/app/models/curso';
import { AlunoService } from 'src/app/services/aluno.service';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-perfil-aluno',
  templateUrl: './perfil-aluno.component.html',
  styleUrls: ['./perfil-aluno.component.css']
})
export class PerfilAlunoComponent implements OnInit {

  alunoId: number;
  aluno$: Observable<Aluno>;
  cursosDoAluno: Curso[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private alunoService: AlunoService,
    private router: Router,
    private cursoService: CursoService
  ) { }

  ngOnInit(): void {
    this.alunoId = this.activatedRoute.snapshot.params.alunoId;
    this.aluno$ = this.alunoService.getAlunoById(this.alunoId);
    this.aluno$.subscribe((aluno) => {
      aluno.cursos.forEach(cursoId => {
        this.cursoService.getCursoById(cursoId).subscribe((curso) => {
          this.cursosDoAluno.push(curso);
        }, (erro) => {
          console.log(erro);
        })
      }, (erro) => {
        console.log(erro);
      });
    }, erro => {
      console.log(erro);
      this.router.navigate(['']);
    });
  }

}
