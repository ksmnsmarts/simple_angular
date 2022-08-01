import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/0.shared/services/auth/auth.service';
import { UserService } from 'src/app/0.shared/services/userService/user.service';

@Component({
    selector: 'app-sign-guard',
    templateUrl: './sign-guard.component.html',
    styleUrls: ['./sign-guard.component.scss']
})
export class SignGuardComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private userService: UserService
    ) { }

    ngOnInit(): void {

        this.getUserProfile();

    }

    getUserProfile() {
        this.userService.getUserProfile().subscribe((data: any)=> {
        })
    }


    
}
