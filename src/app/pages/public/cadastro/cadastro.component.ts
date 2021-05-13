import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Aluno } from 'src/app/models/aluno';
import { Professor } from 'src/app/models/professor';
import { CadastroService } from 'src/app/services/cadastro.service';
import { EmailDisponivelValidatorService } from 'src/app/services/email-disponivel.validator.service';
import { OpcoesFormService } from 'src/app/services/opcoes-form.service.';
import { apenasLetrasValidation, vazioValidation } from '../../../utils/validators/input-nome.validator';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cadastroForm: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required, apenasLetrasValidation, vazioValidation]),
    email: new FormControl('', [Validators.required, Validators.email, vazioValidation], this.emailDisponivelValidatorService.checarEmailDisponivel()),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
    perfil: new FormControl('1', Validators.required),
    idade: new FormControl(''),
    formacao: new FormControl('')
  });

  opcoesPerfil: any[];

  constructor(
    private emailDisponivelValidatorService: EmailDisponivelValidatorService,
    private opcoesFormService: OpcoesFormService,
    private cadastroService: CadastroService,
    private router: Router) { }

  ngOnInit(): void {
    this.opcoesPerfil = this.opcoesFormService.getPerfis();
    this.cadastroForm.get('idade').disable();
    this.cadastroForm.get('formacao').disable();
  }

  cadastrar() {
    if (this.cadastroForm.get('perfil').value == '1') {
      const professor = this.cadastroForm.getRawValue() as Professor;
      this.cadastroService
        .cadastrarProfessor(professor)
        .subscribe(() => this.router.navigate(['']),
        erro => console.log(erro)
        );
    } else if (this.cadastroForm.get('perfil').value == '2') {
      const aluno = this.cadastroForm.getRawValue() as Aluno;
      this.cadastroService
        .cadastrarAluno(aluno)
        .subscribe(() => this.router.navigate(['']),
        erro => console.log(erro)
        );
    }
  }

  alterarPerfilFormulario(perfilId: string) {
    switch (perfilId) {
      case '1':
        this.cadastroForm.get('idade').disable();
        this.cadastroForm.get('formacao').disable();
        break;
      case '2':
        this.cadastroForm.get('idade').enable();
        this.cadastroForm.get('idade').setValidators([Validators.required, Validators.max(120), Validators.min(10)]);
        this.cadastroForm.get('formacao').enable();
        this.cadastroForm.get('formacao').setValidators(Validators.required);
        break;
    }

  }

}
