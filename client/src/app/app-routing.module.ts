import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './0.shared/guard/auth.guard';
import { FileComponent } from './file/file.component';
import { GuardTestComponent } from './guard-test/guard-test.component';
import { GuardComponent } from './guard/guard.component';
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
    {
        path: 'guard',
        component: GuardComponent,
    },
    {
        path: 'guard-test',
        canActivate: [AuthGuard],
        component: GuardTestComponent,
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
