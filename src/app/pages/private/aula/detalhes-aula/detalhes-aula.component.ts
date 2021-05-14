import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Aula } from 'src/app/models/aula';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-detalhes-aula',
  templateUrl: './detalhes-aula.component.html',
  styleUrls: ['./detalhes-aula.component.css']
})
export class DetalhesAulaComponent implements OnInit {

  cursoId: number;
  aulaId: number;
  curso$: Observable<Curso>;
  aula: Aula;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cursoService: CursoService,
    private router: Router) { }

  ngOnInit(): void {
    this.cursoId = this.activatedRoute.snapshot.params.cursoId;
    this.aulaId = this.activatedRoute.snapshot.params.aulaId;
    this.curso$ = this.cursoService.getCursoById(this.cursoId);
    this.curso$.subscribe((curso) => {
      this.aula = curso.aulas.find(aula => aula.id == this.aulaId);
    }, erro => {
      console.log(erro);
      this.router.navigate(['nao-encontrado']);
    })
  }

}
