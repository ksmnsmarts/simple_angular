import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/0.shared/services/auth/auth.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

    signUpForm: FormGroup;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private authService: AuthService
    ) {
        this.signUpForm = this.fb.group({
            id: ['', [Validators.required]],
            password: ['', [Validators.required]],
            name: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {
        /*---------------------------------------------------------------------------
        * 예제에서는 /auth path가 하나로 묶어 만들었기 때문에
        * Guard에서 routing이 아닌
        * sign-in, sign-up component에서 토큰 유무에 따라 routing 함.
        ---------------------------------------------------------------------------*/
        if(this.authService.isAuthenticated()){
            this.router.navigate(['auth/sign-guard']);
        }

    }


    signUp() {
        const data = {
            id: this.signUpForm.value.id,
            password: this.signUpForm.value.password,
            name: this.signUpForm.value.name
        }
        
        this.authService.signUp(data).subscribe((data: any)=> {
            if(data.message == 'duplicated') {
                alert('아이디 중복')
            } else {
                alert('가입 완료')
                this.router.navigate(['/auth/sign-guard']);
            }
        })
    }

}
