import {inject, Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from "../../auth/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    #router = inject(Router);
    #authService = inject(AuthService);

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.#authService.getToken();
        const baseUrl = 'https://www.melivecode.com/';

        // Prefix base URL if it's a relative path
        if (!request.url.startsWith('http')) {
            request = request.clone({
                url: baseUrl + request.url,
            });
        }

        // Add Authorization header if token exists
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.#authService.clearSession();
                    this.#router.navigate(['/login']);
                }
                return throwError(() => error);
            })
        );
    }

}
