import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { FileComponent } from './file/file.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { SocketComponent } from './socket/socket.component';
import { GuardComponent } from './guard/guard.component';
import { GuardTestComponent } from './guard-test/guard-test.component';
import { AuthGuard } from './0.shared/guard/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    FileComponent,
    RxjsComponent,
    SocketComponent,
    GuardComponent,
    GuardTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
