import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '@lib-transversal';

@Component({
  selector: 'app-failed-service',
  imports: [NgOptimizedImage, ButtonComponent],
  templateUrl: './failed-service.component.html',
  styleUrl: './failed-service.component.scss',
})
export default class FailedServiceComponent {
  private router = inject(Router);

  refreshPage() {
    this.router.navigate(['/']);
  }
}
