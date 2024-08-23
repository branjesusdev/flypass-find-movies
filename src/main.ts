import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/modules/app/app.component';
import { appConfig } from './app/modules/app/app.config';
import { environment } from '@environment';
import { enableProdMode } from '@angular/core';

if (environment.production) {
  enableProdMode();

  console.log('%c¡DETENTE!', ' font-weight: bold; color: red; font-size: 45px');
  console.log(
    '%cEsta función del navegador esta pensada para desarrolladores.' +
      ' Si alguien te indico que copiaras y pegaras algo aqui para habilitar una función de FinMovies ' +
      'o para PIRATEAR la cuenta de alguien, se trata de un fraude.',
    'font-family: Arial;, serif; color: gray; font-size: 20px',
  );

  console.log = () => {}; // Eliminar logs en producción
}

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
