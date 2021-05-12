import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cadastroForm: FormGroup = new FormGroup({
    nome: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    idade: new FormControl('', Validators.required),
    formacao: new FormControl('', Validators.required)
  })

  constructor() { }

  ngOnInit(): void {
  }

  cadastrar() {
    //implementar
  }

}
