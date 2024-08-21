import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { OnbordingMasterComponent } from '@pages/onboarding/components/onbording-master/onbording-master.component';
import { OnbordingPremieresComponent } from '@pages/onboarding/components/onbording-premieres/onbording-premieres.component';
import { OnbordingFeaturedComponent } from '@pages/onboarding/components/onbording-featured/onbording-featured.component';

import { routesOnboarding } from '@pages/onboarding/onboarding.routes';
import { httpInterceptorRefactorUrlProvider } from "@shared/interceptors/refactor-url-interceptor.service";
import { httpInterceptorProvidersHeaders } from "@shared/interceptors/headers-interceptor.service";

@NgModule({
  declarations: [

    OnbordingMasterComponent,
    OnbordingPremieresComponent,
    OnbordingFeaturedComponent

  ],
  imports: [
    RouterModule.forChild(routesOnboarding)
  ],
  providers: [


  ]
})
export class OnboardingModule {}

