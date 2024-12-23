import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feature-cards',
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.scss'],
})
export class FeatureCardsComponent {
  constructor(private router: Router) {}

  navigateToAddStudent(): void {
    this.router.navigate(['/student/add-student']);
  }
}
