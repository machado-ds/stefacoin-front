import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Aula } from 'src/app/models/aula';
import { Curso } from 'src/app/models/curso';
import { Professor } from 'src/app/models/professor';
import { CursoService } from 'src/app/services/curso.service';
import { NomeCursoDisponivelValidatorService } from 'src/app/services/nome-curso-disponivel.validator.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { apenasLetrasValidation, vazioValidation } from 'src/app/utils/validators/input-nome.validator';

@Component({
  selector: 'app-edita-curso',
  templateUrl: './edita-curso.component.html',
  styleUrls: ['./edita-curso.component.css']
})
export class EditaCursoComponent implements OnInit {

  listaDeProfessores$: Observable<Professor[]>;
  editaCursoForm: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required, vazioValidation], this.nomeCursoDisponivelValidatorService.checarNomeCursoDisponivel()),
    descricao: new FormControl('', Validators.required),
    idProfessor: new FormControl('', Validators.required),
    aulas: new FormGroup({
      nome: new FormControl(''),
      duracao: new FormControl(''),
      topicos: new FormControl('')
    })
  })

  aulasInclusas: any[] = [];
  mensagemErroNome: string;
  curso$: Observable<Curso>;
  cursoId: number;

  constructor(
    private professorService: ProfessorService,
    private nomeCursoDisponivelValidatorService: NomeCursoDisponivelValidatorService,
    private cursoService: CursoService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.listaDeProfessores$ = this.professorService.listar();
    this.curso$ = this.cursoService.getCursoById(this.activatedRoute.snapshot.params.cursoId);
    this.cursoId = this.activatedRoute.snapshot.params.cursoId;
    this.curso$.subscribe((curso) => {
      curso.aulas.forEach(aula => {
        this.aulasInclusas.push(aula);
      })
      this.editaCursoForm.get('nome').patchValue(curso.nome);
      this.editaCursoForm.get('descricao').patchValue(curso.descricao);
      this.editaCursoForm.get('idProfessor').patchValue(curso.idProfessor);
    }, erro => {
      console.log(erro.message);
    })
  }

  incluirAula() {
    this.mensagemErroNome = undefined;
    const dadosFormulario = this.editaCursoForm.getRawValue();
    this.aulasInclusas.forEach(aula => {
      if (aula.nome == dadosFormulario.aulas.nome) {
        this.mensagemErroNome = 'Já existe uma aula com esse nome neste curso. Tente inserir um novo nome.';
        return;
      }
    })

    if (!this.mensagemErroNome) {
      this.aulasInclusas.push(dadosFormulario.aulas);
    }

    console.log(dadosFormulario);
    console.log(this.aulasInclusas);

  }

  editarCurso() {
    let curso = this.editaCursoForm.getRawValue() as Curso;

    let aulasInclusasComTopicos = this.aulasInclusas.map((aula) => {
      let novaAula = {} as Aula;
      novaAula['nome'] = aula.nome;
      novaAula['duracao'] = aula.duracao;
      if (typeof aula.topicos == 'string') {
        novaAula['topicos'] = aula.topicos.split(';');
      } else {
        novaAula['topicos'] = aula.topicos;
      }
      novaAula['id'] = this.aulasInclusas.indexOf(aula);
      novaAula['idCurso'] = this.cursoId;
      return novaAula;
    })

    curso.aulas = aulasInclusasComTopicos;
    curso.idProfessor = Number(curso.idProfessor);
    
    this.cursoService.editaCurso(this.cursoId, curso).subscribe((mensagem) => {
      console.log(mensagem.mensagem);
      this.toastrService.success(mensagem.mensagem);
      this.router.navigate(['']);
    }, erro => {
      console.log(erro);
      this.toastrService.error(erro.message);
    })
  }
}
