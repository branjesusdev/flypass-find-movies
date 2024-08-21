import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Inject, inject, Injectable } from "@angular/core";
import { Observable, TimeoutError, catchError, filter, from, map, mergeMap, throwError, timeout } from "rxjs";

// RESOURCES

import { API_BASE_URL } from "@conf/tokens";
import { LogStrategyService } from "@shared/command/log";

@Injectable()
export class RefactorUrlInterceptor implements HttpInterceptor {

  constructor(
    @Inject(API_BASE_URL) private apiBaseUrl : string,
    private log : LogStrategyService
  ) { }


  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const request = req.clone({
      url: `${this.apiBaseUrl}${req.url}`
    });

    this.log.write({ indetity: 'HttpRequest 🥅🥅🥅', message: { request } })

    return next.handle(request)
      .pipe(
        timeout(15000),
        filter((event: HttpEvent<any>) => (event instanceof HttpResponse)),
        map((event: HttpEvent<any>) => {

          if (event instanceof HttpResponse)
            this.log.write({ indetity: 'HttpEvent ✅✅✅', message: { event } })

          return event;

        }),
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent)
            errorMsg = `Error: ${error.error.message ?? ''}`;
          else if (error instanceof TimeoutError)
            errorMsg = `Error: El servicio tomó más de 15 segundos en responder`;
          else
            errorMsg = `Error Code: ${error.status},  Message: ${error.message ?? ''}`;

          this.log.write({ indetity: 'HttpEvent ❌❌❌', message: { errorMsg } })

          throw errorMsg;
        })
      )


  }


}
export const httpInterceptorRefactorUrlProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: RefactorUrlInterceptor,
    multi: true
  }
]
