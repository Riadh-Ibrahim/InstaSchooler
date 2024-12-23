import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() icon: string = ''; 
  @Input() count: number = 0;
  @Input() title: string = '';
}