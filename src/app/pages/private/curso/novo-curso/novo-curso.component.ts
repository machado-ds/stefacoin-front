import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-novo-curso',
  templateUrl: './novo-curso.component.html',
  styleUrls: ['./novo-curso.component.css']
})
export class NovoCursoComponent implements OnInit {

  listaDeProfessores$: Observable<Professor[]>;

  novoCursoForm: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required, vazioValidation], this.nomeCursoDisponivelValidatorService.checarNomeCursoDisponivel()),
    descricao: new FormControl('', Validators.required),
    idProfessor: new FormControl('', Validators.required),
    aulas: new FormGroup({
      nome: new FormControl('', Validators.required),
      duracao: new FormControl('', Validators.required),
      topicos: new FormControl('', Validators.required)
    })
  })

  aulasInclusas: any[] = [];
  mensagemErroNome: string;
  professorDoCurso: Professor;

  constructor(
    private professorService: ProfessorService,
    private nomeCursoDisponivelValidatorService: NomeCursoDisponivelValidatorService,
    private cursoService: CursoService,
    private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.listaDeProfessores$ = this.professorService.listar();
  }

  incluirAula() {
    this.mensagemErroNome = undefined;
    const dadosFormulario = this.novoCursoForm.getRawValue();
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

  cadastrarCurso() {
    let curso = this.novoCursoForm.getRawValue() as Curso;

    let aulasInclusasComTopicos = this.aulasInclusas.map((aula) => {
      let novaAula = {} as Aula;
      novaAula['nome'] = aula.nome;
      novaAula['duracao'] = aula.duracao;
      novaAula['topicos'] = aula.topicos.split(';');
      novaAula['id'] = this.aulasInclusas.indexOf(aula);
      novaAula['idCurso'] = 0;
      return novaAula;
    })

    curso.aulas = aulasInclusasComTopicos;
    curso.idProfessor = Number(curso.idProfessor);
    this.professorService.getProfessorById(curso.idProfessor).subscribe((professor) => {
      this.professorDoCurso = professor;
    });
    
    
    this.cursoService.cadastraCurso(curso).subscribe((mensagem) => {
      console.log(mensagem.mensagem);
      this.toastrService.success(mensagem.mensagem);
      curso.aulas.forEach(aula => {
        aula.idCurso = mensagem.data.id;
      })

      this.cursoService.editaCurso(mensagem.data.id, curso).subscribe((mensagem) => console.log(mensagem.mensagem), erro => console.log(erro)
      );

      this.professorDoCurso.cursos.push(mensagem.data.id);
      this.professorService.alterar(curso.idProfessor, this.professorDoCurso).subscribe((mensagem) => {
        console.log(mensagem.mensagem);
      }, erro => {
        console.log(erro.error.message);
      })
      
      this.router.navigate(['']);
    }, erro => {
      console.log(erro);
      this.toastrService.error(erro.message);
    })
  }
}
