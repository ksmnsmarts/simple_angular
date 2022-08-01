import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/0.shared/services/auth/auth.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

    signUpForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService
    ) {
        this.signUpForm = this.fb.group({
            id: [''],
            password: [''],
            name: [''],
        });
    }

    ngOnInit(): void {
        

    }


    signUp() {
        const data = {
            id: this.signUpForm.value.id,
            password: this.signUpForm.value.password,
            name: this.signUpForm.value.name
        }
        console.log(data)
        this.authService.signUp(data).subscribe((data: any)=> {
            
        })
    }

}
