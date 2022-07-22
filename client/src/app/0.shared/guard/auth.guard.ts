import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnInit {

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
        console.log('auth redirect onInit');
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        try {
            const token = localStorage.getItem('token');

            // 토큰이 존재하면 이미 라우팅 된 페이지로 그대로 진행
            if (token) {
                return true;
            }
            // 토큰이 없으면 튕겨내기
            else {
                alert('Guard !!!')
                this.router.navigate(['/guard']);
                return true;
            }
        } catch (error) {

            console.log(error)
            return true
        }
    }

}
