import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private opcoesFormService: OpcoesFormService) { }

  ngOnInit(): void {
    this.notas = this.opcoesFormService.getNotas();
  }

  registrarAvaliacao() {
    
    
  }

}
