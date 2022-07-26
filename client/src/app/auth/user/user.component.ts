import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/0.shared/services/auth/auth.service';
import { UserService } from 'src/app/0.shared/services/userService/user.service';
import { DataService } from 'src/app/0.shared/store/data.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    private unsubscribe$ = new Subject<void>();

    user;

    selector: any;

    constructor(
        private router: Router,
        private authService: AuthService,
        private userService: UserService,
        private dataService: DataService,
    ) {
    }

    ngOnInit(): void {

        // server에서 userData 가져오기
        this.userService.getUserProfile().subscribe((data: any) => {
            if (data.result) {
                this.getUserProfileData();
            }

            // console.log('[token info]', this.authService.getTokenInfo());
        })
    }

    ngOnDestroy() {
        // unsubscribe all subscription
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }


    // store에 있는 userData 바라보기
    getUserProfileData() {
        this.dataService.state$.pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
            console.log(res)
            this.user = res
        });
    }


    logOut() {
        this.authService.removeToken(); // 토큰 제거
        this.router.navigate(['/auth']);
    }

}
