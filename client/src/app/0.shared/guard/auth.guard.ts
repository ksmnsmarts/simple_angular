import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnInit {

    constructor(
        private router: Router,
        private authService: AuthService,
    ) { }

    ngOnInit() {
        console.log('auth redirect onInit');
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        try {
            const routePath = route.routeConfig.path;

            if (!this.authService.isAuthenticated()) {
                if (routePath == 'auth' || routePath == 'sign-up') {
                    return true;
                } else {
                    /*---------------------------------------------------------------------------
                    *           redirect
                    * // Navigate to /results?page=1
                    * this.router.navigate(['/results'], { queryParams: { page: 1 } });
                    ---------------------------------------------------------------------------*/
                    alert('토큰 없음\n로그인 시 해당 페이지로 redirect 됩니다.')
                    this.router.navigate(['auth'], { queryParams: {'redirectURL': state.url } });
                }
                return true;
            } else {
                /*---------------------------------------------------------------------------
                * 이 부분에서 토큰 유무를 판단해 토큰이 있으면 해당 url로 routing 시켰으나
                * 예제에서는 /auth path가 하나로 묶어 만들었기 때문에
                * sign-in, sign-up component에서 토큰 유무에 따라 routing 시켰음.
                ---------------------------------------------------------------------------*/
                if (routePath == 'auth') {
                    this.router.navigate(['auth/user']);
                    return true;
                } else if (routePath == 'auth/sign-up') {
                    this.router.navigate(['auth/user']);
                    return true;
                } else {
                    return true;
                }
            }
        } catch (error) {

            console.log(error)
            return true
        }
    }

}
