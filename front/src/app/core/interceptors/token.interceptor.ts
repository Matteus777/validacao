import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokeInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token,
      },
    });

    req = req.clone({ url: environment.url + req.url });

    console.log(req);
    return next.handle(req).pipe(
      catchError((error: HttpResponse<any>) => {
        if (error.status === 401) {
          this.authService.logout('login');
        }
        return throwError(() => error);
      })
    );
  }
}
