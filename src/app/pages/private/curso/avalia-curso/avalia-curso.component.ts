import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Avaliacao } from 'src/app/models/avaliacao';
import { AuthService } from 'src/app/services/auth.service';
import { CursoService } from 'src/app/services/curso.service';
import { OpcoesFormService } from 'src/app/services/opcoes-form.service.';

@Component({
  selector: 'app-avalia-curso',
  templateUrl: './avalia-curso.component.html',
  styleUrls: ['./avalia-curso.component.css']
})
export class AvaliaCursoComponent implements OnInit {

  notas: number[];
  avaliacaoForm: FormGroup = new FormGroup({
    nota: new FormControl('1', Validators.required)
  });
  cursoId: number;
  alunoId: number;

  constructor(
    private opcoesFormService: OpcoesFormService,
    private cursoService: CursoService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.notas = this.opcoesFormService.getNotas();
    this.cursoId = this.activatedRoute.snapshot.params.cursoId;
    this.alunoId = this.authService.getUsuario().id;
  }

  registrarAvaliacao() {
      const avaliacao: Avaliacao = { alunoId: this.alunoId, nota: Number(this.avaliacaoForm.get('nota').value)};
      return this.cursoService.registraAvaliacao(this.cursoId, avaliacao)
        .subscribe(mensagem => {
          this.toastr.success(mensagem.mensagem);
          this.router.navigate(['']);
        }, erro => {
          this.toastr.error(erro.message);
          console.log(erro);
        })
    }
}
