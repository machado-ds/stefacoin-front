import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() imgSrc: string;
  @Input() alt: string;
  @Input() titulo: string;
  @Input() desc: string;


  constructor() { }

  ngOnInit(): void {
  }

}
