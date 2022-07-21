import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileComponent } from './file/file.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { SocketComponent } from './socket/socket.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [
    { 
        path: 'todoList',
        component: TodoListComponent,
    },
    {
        path: 'file',
        component: FileComponent,
    },
    {
        path: 'rxjs',
        component: RxjsComponent,
    },
    {
        path: 'socket',
        component: SocketComponent,
    },
    // 잘못된 URL을 사용했을때 메인으로 보냄
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
