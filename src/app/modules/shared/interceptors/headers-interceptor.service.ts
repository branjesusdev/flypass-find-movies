import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Inject, Injectable } from '@angular/core';
import { Observable } from "rxjs";

// RESOURCES

import { API_KEY_TOKEN } from "@conf/tokens";

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {

  constructor(
    @Inject(API_KEY_TOKEN) private apiAccessToken: string
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const headers = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiAccessToken}`
      },
    });
    return next.handle(headers);

  }

}

export const httpInterceptorProvidersHeaders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpHeadersInterceptor,
    multi: true
  }
]
