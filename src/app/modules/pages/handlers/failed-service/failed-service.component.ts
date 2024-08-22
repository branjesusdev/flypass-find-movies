import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-failed-service',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './failed-service.component.html',
  styleUrl: './failed-service.component.scss',
})
export default class FailedServiceComponent {
  constructor(private router: Router) {}

  refreshPage() {
    this.router.navigate(['/']);
  }
}
