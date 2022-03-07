import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err) {
          if (err.status === 400) {
            this.errorMessage(err);
          }
          if (err.status === 401) {
            this.errorMessage(err);
          }
          if (err.status === 404) {
            this.errorMessage(err);
          }
          if (err.status === 409) {
            this.errorMessage(err);
          }
          if (err.status === 500) {
            this.errorMessage(err);
          }
        }

        let error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }

  errorMessage = (err: any) => {};
}
