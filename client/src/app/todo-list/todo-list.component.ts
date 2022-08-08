import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable,  } from 'rxjs';
import { AuthService } from '../0.shared/services/auth/auth.service';
import { TodoService } from '../0.shared/services/todoService/todo.service';
import { RxjsService } from '../0.shared/store/rxjs.service';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})


export class TodoListComponent implements OnInit {

    todoData: any;
    selector: any;
    flag: boolean = false;

    todoForm: FormGroup;
    editTodoForm: FormGroup;
    isChecked:Boolean = false;
    checked;

    constructor(
        private fb: FormBuilder,
        private todoService: TodoService,
        private rxjsService: RxjsService,
        private authService: AuthService,
        private router: Router
    ) {
        this.todoForm = this.fb.group({
            todo: ['', [Validators.required]]
        });

        this.editTodoForm = this.fb.group({
            editTodo: ['']
        });

    }


    ngOnInit(): void {
        if(this.authService.isAuthenticated()){
            // this.router.navigate(['todoList']);
        }

        this.getAllTodo();
    }


    // 모든 목록 가져오기
    getAllTodo() {
        this.todoService.getAllTodo().subscribe((data: any) => {
            this.todoData = data
        })
    }

    // 내 목록 가져오기
    getMyTodo() {
        this.todoService.getMyTodo().subscribe((data: any) => {
            this.todoData = data
        })
    }


    // 할 일 추가
    addTodo() {
        const data = this.todoForm.value

        this.todoService.addTodo(data).subscribe((data: any) => {
            if (data.message == 'success todo save') {
                this.todoForm.reset();
                this.getAllTodo();
            }
        })
    }

    // 수정버튼
    editBtn(_id: any) {
        this.selector = _id
        this.flag = true;
    }


    // 할 일 수정
    editTodo(_id: any) {
        const data = {
            _id: _id,
            todo: this.editTodoForm.value.editTodo
        }

        this.todoService.editTodo(data).subscribe((data: any) => {
            if (data.message == 'success todo edit') {
                this.flag = false;
                this.getAllTodo();
            }
        })
    }

    // 할 일 삭제
    deleteBtn(_id: any) {
        const data = {
            _id: _id,
        }

        this.todoService.deleteTodo(data).subscribe((data: any) => {
            if (data.message == 'success todo delete') {
                this.getAllTodo();
            }
        })
    }




    // rxjs
    addRxjs(item) {
        const data = {
            todo: item.todo
        }

        console.log('rxjs [data ---add---> store]')
        this.rxjsService.addRxjs(data)
    }
    // rxjs
    removeRxjs(item) {
        const data = {
            todo: item.todo
        }

        console.log('rxjs [store ---remove---> data]')
        this.rxjsService.removeRxjs(data)
    }

}
