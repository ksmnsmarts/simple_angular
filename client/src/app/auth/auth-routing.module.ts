import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../0.shared/guard/auth.guard';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
    { 
        path: '', 
        component: SignInComponent
    },
    { 
        path: 'sign-up', 
        component: SignUpComponent
    },
    { 
        path: 'user', 
        canActivate: [AuthGuard],
        component: UserComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
