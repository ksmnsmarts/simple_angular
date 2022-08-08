import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/0.shared/services/auth/auth.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

    params: any;
    
    signInForm: FormGroup;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private authService: AuthService,
        private route: ActivatedRoute,
    ) {
        this.signInForm = this.fb.group({
            id: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    ngOnInit(): void {
        /*---------------------------------------------------------------------------
        *  예제에서는 /auth path가 하나로 묶어 만들었기 때문에
        *  Guard에서 routing이 아닌
        *  sign-in, sign-up component에서 토큰 유무에 따라 routing 함.
        ---------------------------------------------------------------------------*/
        if(this.authService.isAuthenticated()){
            this.router.navigate(['auth/user']);
        }

        /*---------------------------------------------------------------------------
        *           redirect
        *  token이 없을 때 todo List로 routing 한 경우 Guard.
        *  Guard의  queryParams에 객체를 추가해 해당 rout path를 가지고 있으며 
        *  singIn() 함수 실행 시 params.key 를 이용하여 해당 경로로 redirect 시킴.
        ---------------------------------------------------------------------------*/
        this.route.queryParams.subscribe(params => {
            console.log(params)
            this.params = params;
        });
    }

    // 로그인
    signIn() {
        const data = {
            id: this.signInForm.value.id,
            password: this.signInForm.value.password,
        }
        this.authService.signIn(data).subscribe((data: any)=> {
            if(data.message == 'mismatch') {
                alert('아이디/비밀번호 오류')
            } else if(this.params.redirectURL != '' && this.params.redirectURL != null && data.token != '' && data.token != null ){
                this.router.navigate([`${this.params.redirectURL}`]);
            } else {
                this.router.navigate(['/auth/user']);
            } 
        })
    }

}
