import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './main-header.component.html',
})
export class MainHeaderComponent {

}
