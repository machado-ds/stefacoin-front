import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Aluno } from 'src/app/models/aluno';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-perfil-aluno',
  templateUrl: './perfil-aluno.component.html',
  styleUrls: ['./perfil-aluno.component.css']
})
export class PerfilAlunoComponent implements OnInit {

  alunoId: number;
  aluno$: Observable<Aluno>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alunoService: AlunoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.alunoId = this.activatedRoute.snapshot.params.alunoId;
    this.aluno$ = this.alunoService.getAlunoById(this.alunoId);
    this.aluno$.subscribe(() => {}, erro => {
      console.log(erro);
      this.router.navigate(['']);
    })
  }

}
