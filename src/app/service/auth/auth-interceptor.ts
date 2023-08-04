import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';

import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
        null
    );
    private earlierAccessToken: string;
    private earlierRefreshToken: string;
    constructor(
        private authService: AuthService
    ) {}

    public intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
      request = this.addToken(request);
      return this.handleRequest(request, next);
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

   private shouldUpdateToken(url: string) {
    return (
      url !== `${environment.handlerApiUrl}/login`
    );
  }
}
