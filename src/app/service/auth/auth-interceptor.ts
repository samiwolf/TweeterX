import {BehaviorSubject, map, Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {AuthService} from './auth.service';
import {catchError} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService
  ) {
  }

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = this.addToken(request);
    return next.handle(request).pipe(
      map(event => {
        if (event instanceof HttpResponse && this.shouldUpdateToken(event)) {
          this.authService.logout();
          window.location.reload();
        }
        return event;
      }));
  }

  private handleRequest(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // if (this.shouldUpdateToken(request.url)) {
        //     return this.addUpdatedToken(request, next);
        // } else {
        console.error('Error during api request', error);
        return throwError(error);
        // }
      })
    );
  }

  private handleLogout(request: HttpRequest<any>, next: HttpHandler) {
    // todo: redirect to login at sso
    return next.handle(request);
  }

  private addToken(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: this.authService.getAuthHeaders(request.url)
    });
  }

  private shouldUpdateToken(event: any) {
    if (event && event.body && event.body.error)
    {
      console.log(event.body.error);
      return event.body.error === 'Invalid or Expired JWT';
    }
    return false;
  }
}
