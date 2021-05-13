import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensagem-sucesso',
  templateUrl: './mensagem-sucesso.component.html',
  styleUrls: ['./mensagem-sucesso.component.css']
})
export class MensagemSucessoComponent implements OnInit {

  @Input() texto: string;

  constructor() { }

  ngOnInit(): void {
  }

}
