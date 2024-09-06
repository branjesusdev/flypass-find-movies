import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, provideProtractorTestingSupport } from '@angular/platform-browser';

// RESOURCES

import { API_BASE_URL, API_KEY_TOKEN } from '@conf/tokens';
import { environment } from '@environment';
import { TheMovieDBPort } from '@shared/core/domain/ports/themoviedb-port.class';
import { HttpTmdbAdapterService } from '@shared/command/adapters/http-tmdb-adapter.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { httpInterceptorProvidersHeaders } from '@shared/interceptors/headers-interceptor.service';
import { httpInterceptorRefactorUrlProvider } from '@shared/interceptors/refactor-url-interceptor.service';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Agrupar eventos de detección de cambios
    provideProtractorTestingSupport(),
    provideRouter(
      routes,
      withViewTransitions(),
      withComponentInputBinding(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),

    // RESOURCES

    {
      provide: API_BASE_URL,
      useFactory: () => environment.API_BASE_URL,
    },
    {
      provide: API_KEY_TOKEN,
      useFactory: () => environment.API_KEY_TOKEN,
    },

    // SERVICES

    {
      provide: TheMovieDBPort,
      useClass: HttpTmdbAdapterService,
    },

    // INTERCEPTORS

    ...httpInterceptorRefactorUrlProvider,
    ...httpInterceptorProvidersHeaders,
  ],
};
