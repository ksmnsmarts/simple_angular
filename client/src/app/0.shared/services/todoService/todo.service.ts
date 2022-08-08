import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    constructor(
        private http: HttpClient
    ) { }


    // 목록 가져오기
    getTodoList() {
        return this.http.get('/api/v1/todo/getTodoList');
    }

    // 할 일 등록
    addTodo(data:any) {
        return this.http.post('/api/v1/todo/addTodo', data);
    }

    // 할 일 수정
    editTodo(data: any){
        return this.http.post('/api/v1/todo/editTodo', data);
    }

    // 할 일 삭제
    deleteTodo(data: any){
        return this.http.post('/api/v1/todo/deleteTodo', data);
    }


    // ----------------------todo aggregate-------------------------------------
    // 모든 목록 가져오기
    aggregate_getAllTodo() {
        return this.http.get('/api/v1/aggregateTodo/aggregate_getAllTodo');
    }

    // 내 목록 가져오기
    aggregate_getMyTodo() {
        return this.http.get('/api/v1/aggregateTodo/aggregate_getMyTodo');
    }

    // 할 일 등록
    aggregate_addTodo(data:any) {
        return this.http.post('/api/v1/aggregateTodo/aggregate_addTodo', data);
    }
    
}
