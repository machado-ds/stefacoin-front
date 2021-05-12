import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensagem-erro',
  templateUrl: './mensagem-erro.component.html',
  styleUrls: ['./mensagem-erro.component.css']
})
export class MensagemErroComponent implements OnInit {

  @Input() texto: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
