import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable,  } from 'rxjs';
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
        private rxjsService: RxjsService
    ) {
        this.todoForm = this.fb.group({
            todo: ['']
        });

        this.editTodoForm = this.fb.group({
            editTodo: ['']
        });

    }


    ngOnInit(): void {
        this.getTodoList();
    }


    // 할 일 추가
    addTodo() {
        const data = this.todoForm.value

        this.todoService.addTodo(data).subscribe((data: any) => {
            if (data.message == 'success todo save') {
                this.todoForm.reset();
                this.getTodoList();
            }
        })
    }

    // 목록 가져오기
    getTodoList() {
        this.todoService.getTodoList().subscribe((data: any) => {
            this.todoData = data
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
                this.getTodoList();
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
                this.getTodoList();
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

    removeRxjs(item) {
        const data = {
            todo: item.todo
        }

        console.log('rxjs [store ---remove---> data]')
        this.rxjsService.removeRxjs(data)
    }

}
