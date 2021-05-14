import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Aluno } from 'src/app/models/aluno';
import { Curso } from 'src/app/models/curso';
import { Professor } from 'src/app/models/professor';
import { AlunoService } from 'src/app/services/aluno.service';
import { AuthService } from 'src/app/services/auth.service';
import { CursoService } from 'src/app/services/curso.service';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-detalhes-curso',
  templateUrl: './detalhes-curso.component.html',
  styleUrls: ['./detalhes-curso.component.css']
})
export class DetalhesCursoComponent implements OnInit, OnChanges {

  cursoId: number;
  curso$: Observable<Curso>;
  aluno$: Observable<Aluno>;
  alunoId: number;
  prof$: Observable<Professor>;
  profId: number;
  alunoMatriculadoEmCurso: boolean = false;
  usuario: number;
  mediaAvaliacao: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cursoService: CursoService,
    private router: Router,
    private alunoService: AlunoService,
    private authService: AuthService,
    private professorService: ProfessorService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario().tipo;
    this.cursoId = Number(this.activatedRoute.snapshot.params.cursoId);
    this.curso$ = this.cursoService.getCursoById(this.cursoId);
    this.curso$.subscribe((curso) => {}, erro => {
      console.log(erro);
      this.router.navigate(['nao-encontrado']);
    })
    

    if (this.usuario == 1) {
      this.profId = this.authService.getUsuario().id;
      this.prof$ = this.professorService.getProfessorById(this.profId);
    }

    if (this.usuario == 2) {
      this.alunoId = this.authService.getUsuario().id;
      this.aluno$ = this.alunoService.getAlunoById(this.alunoId);
      this.aluno$.subscribe((aluno) => {
        this.alunoMatriculadoEmCurso = aluno.cursos.includes(this.cursoId);
      }, erro => {
        console.log(erro);
        this.router.navigate(['nao-encontrado']);
      })
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.alunoMatriculadoEmCurso) {
      this.alunoMatriculadoEmCurso = changes.alunoMatriculadoEmCurso.currentValue;
    }
  }

  matricula() {
    console.log('Chamando matricula()');
    
    return this.cursoService.matricula(this.alunoId, this.cursoId)
      .subscribe(mensagem => {
        this.toastr.success(mensagem.mensagem);
        this.alunoMatriculadoEmCurso = true;
      }, erro => console.log(erro)
      )
  }

  cancelaMatricula() {
    return this.cursoService.cancelarMatricula(this.alunoId, this.cursoId)
      .subscribe(mensagem => {
        this.toastr.success(mensagem.mensagem);
        this.alunoMatriculadoEmCurso = false;
      }, erro => console.log(erro)
      )
  }

  excluirCurso() {
    this.cursoService.excluirCurso(this.cursoId).subscribe((mensagem) => {
      this.toastr.success(mensagem.mensagem);
      this.router.navigate(['']);
    })
  }
}
