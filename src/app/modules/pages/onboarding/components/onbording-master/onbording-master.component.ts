import { Component } from '@angular/core';
import { OnbordingFeaturedComponent } from '@pages/onboarding/components/onbording-featured/onbording-featured.component';
import { OnbordingPremieresComponent } from '@pages/onboarding/components/onbording-premieres/onbording-premieres.component';

@Component({
  selector: 'app-onbording-master',
  standalone: true,
  imports: [OnbordingFeaturedComponent, OnbordingPremieresComponent],
  templateUrl: './onbording-master.component.html',
  styleUrl: './onbording-master.component.scss',
})
export default class OnbordingMasterComponent {}
