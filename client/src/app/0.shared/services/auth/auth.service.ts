import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';

// Env
import { environment } from 'src/environments/environment';

interface Token {
    token: String
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private jwtHelper: JwtHelperService,

    ) { }

    signUp(userData) {
        return this.http.post('/api/v1/auth/signUp', userData);
    }

    signIn(userData): Observable<Token> {
        return this.http.post<Token>('/api/v1/auth/signIn', userData)
            .pipe(
                shareReplay(),
                tap(
                    (res: any) => {
                        this.setToken(res.token);
                        console.log('[token]', res.token);
                    }),
            )
    }

    logOut(): void {
        this.removeToken();
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        return token ? !this.isTokenExpired(token) : false;
    }

    getToken() {
        return localStorage.getItem(environment.tokenName);
    }

    setToken(token: string): void {
        localStorage.setItem(environment.tokenName, token);
    }

    removeToken(): void {
        localStorage.removeItem(environment.tokenName);
    }

    // jwtHelper
    isTokenExpired(token: string) {
        return this.jwtHelper.isTokenExpired(token);
    }

    getTokenInfo() {
        return this.jwtHelper.decodeToken(this.getToken());
    }

}
