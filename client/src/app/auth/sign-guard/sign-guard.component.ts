import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/0.shared/services/auth/auth.service';
import { TodoService } from 'src/app/0.shared/services/todoService/todo.service';
import { UserService } from 'src/app/0.shared/services/userService/user.service';
import { DataService } from 'src/app/0.shared/store/data.service';

@Component({
    selector: 'app-sign-guard',
    templateUrl: './sign-guard.component.html',
    styleUrls: ['./sign-guard.component.scss']
})
export class SignGuardComponent implements OnInit {

    private unsubscribe$ = new Subject<void>();
    
    user;


    todoData: any;
    selector: any;

    todoForm: FormGroup;
    

    constructor(
        private router: Router,
        private authService: AuthService,
        private userService: UserService,
        private dataService: DataService,
        private fb: FormBuilder,
        private todoService: TodoService
    ) { 
        this.todoForm = this.fb.group({
            todo: ['']
        });
    }

    ngOnInit(): void {

        // server에서 userData 가져오기
        this.userService.getUserProfile().subscribe((data: any)=> {
            if(data.result) {
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



    // ----------------------todo aggregate-------------------------------------
    // 할 일 추가
    aggregate_addTodo() {
        const data = this.todoForm.value

        this.todoService.aggregate_addTodo(data).subscribe((data: any) => {
            if (data.message == 'success todo save') {
                this.todoForm.reset();
            }
        })
    }

    // 목록 가져오기
    aggregate_getAllTodo() {
        this.todoService.aggregate_getAllTodo().subscribe((data: any) => {
            console.log(data)
            this.todoData = data
        })
    }

    // 내 목록 가져오기
    aggregate_getMyTodo() {
        this.todoService.aggregate_getMyTodo().subscribe((data: any) => {
            console.log(data)
            this.todoData = data
        })
    }
}
