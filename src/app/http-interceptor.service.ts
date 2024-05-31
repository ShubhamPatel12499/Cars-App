import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const modifiedRequest = request.clone({
      headers: request.headers.set('Authorization', 'Bearer YOUR_AUTH_TOKEN')
    });

    return next.handle(modifiedRequest).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // Handle successful responses here
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle error responses here
        return throwError(error);
      })
    );
  }
}
