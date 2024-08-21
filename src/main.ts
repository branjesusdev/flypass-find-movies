import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/modules/app/app.component';
import { appConfig } from './app/modules/app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
