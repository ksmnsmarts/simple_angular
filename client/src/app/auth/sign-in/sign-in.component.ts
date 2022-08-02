import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/0.shared/services/auth/auth.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

    signInForm: FormGroup;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private authService: AuthService
    ) {
        this.signInForm = this.fb.group({
            id: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    ngOnInit(): void {
        /*---------------------------------------------------------------------------
        * 예제에서는 /auth path가 하나로 묶어 만들었기 때문에
        * Guard에서 routing이 아닌
        * sign-in, sign-up component에서 토큰 유무에 따라 routing 시켰음.
        ---------------------------------------------------------------------------*/
        if(this.authService.isAuthenticated()){
            this.router.navigate(['auth/sign-guard']);
        }
    }


    // 로그인
    signIn() {
        const data = {
            id: this.signInForm.value.id,
            password: this.signInForm.value.password,
        }
        this.authService.signIn(data).subscribe((data: any)=> {
            this.router.navigate(['/auth/sign-guard']);
        })
    }

}
