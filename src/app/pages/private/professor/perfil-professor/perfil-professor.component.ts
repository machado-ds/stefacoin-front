import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/models/curso';
import { Professor } from 'src/app/models/professor';
import { CursoService } from 'src/app/services/curso.service';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-perfil-professor',
  templateUrl: './perfil-professor.component.html',
  styleUrls: ['./perfil-professor.component.css']
})
export class PerfilProfessorComponent implements OnInit {

  professorId: number;
  professor$: Observable<Professor>;
  cursosDoProfessor: Curso[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private professorService: ProfessorService,
    private router: Router,
    private cursoService: CursoService) { }

  ngOnInit(): void {
    this.professorId = this.activatedRoute.snapshot.params.professorId;
    this.professor$ = this.professorService.getProfessorById(this.professorId);
    this.professor$.subscribe((professor) => { 
      professor.cursos.forEach(cursoId => {
        this.cursoService.getCursoById(cursoId).subscribe((curso) => {
          this.cursosDoProfessor.push(curso);
        }, (erro) => {
          console.log(erro);
        })
      }, (erro) => {
        console.log(erro);
      });
    }, erro => {
      console.log(erro);
      this.router.navigate(['']);
    })
  }
}
