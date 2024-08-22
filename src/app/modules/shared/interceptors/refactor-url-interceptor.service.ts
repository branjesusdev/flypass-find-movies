import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, TimeoutError, catchError, filter, map, throwError, timeout } from 'rxjs';

// RESOURCES

import { API_BASE_URL } from '@conf/tokens';
import { LogStrategyService } from '@shared/command/log';
import { Router } from '@angular/router';

@Injectable()
export class RefactorUrlInterceptor implements HttpInterceptor {
  constructor(
    @Inject(API_BASE_URL) private apiBaseUrl: string,
    private log: LogStrategyService,
    private router: Router,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({
      url: `${this.apiBaseUrl}${req.url}`,
    });

    this.log.write({ indetity: 'HttpRequest 🥅🥅🥅', message: { request } });

    return next.handle(request).pipe(
      timeout(15000),
      filter((event: HttpEvent<any>) => event instanceof HttpResponse),
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse)
          this.log.write({ indetity: 'HttpEvent ✅✅✅', message: { event } });

        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.log.write({ indetity: 'HttpEvent ❌❌❌', message: { error } });
        this.router.navigate(['/failed']);
        return throwError(() => error);
      }),
    );
  }
}
export const httpInterceptorRefactorUrlProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: RefactorUrlInterceptor,
    multi: true,
  },
];
