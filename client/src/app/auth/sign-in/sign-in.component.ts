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
    }


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
