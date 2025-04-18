import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Router} from "@angular/router";
import {LoginResponse} from './models/loginResponse';

@Injectable({providedIn: 'root'})
export class AuthService {
    #router = inject(Router)
    #http = inject(HttpClient)

    login(credentials: { email: string; password: string }) {
        return this.#http.post<LoginResponse>('api/login', credentials).pipe(
            tap(res => {
                this.setToken(res)
            })
        );
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    logout() {
        this.clearSession();
        this.#router.navigate(['/login']); // ✅ navigate to dashboard
    }

    getToken(): string | null {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem('token');
        }
        return null;
    }

    setToken(res: LoginResponse): void {
        const now = new Date().getTime(); // current time in ms
        const expiresInMs = res.expiresIn; // convert to ms if needed
        const expiryTime = now + expiresInMs;

        sessionStorage.setItem('token', res.accessToken);
        sessionStorage.setItem('token_expiry', expiryTime.toString());
    }

    clearSession(): void {
        if (typeof window !== 'undefined') {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('token_expiry');
        }
    }
}
