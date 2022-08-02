import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../0.shared/guard/auth.guard';
import { SignGuardComponent } from './sign-guard/sign-guard.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

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
        path: 'sign-guard', 
        canActivate: [AuthGuard],
        component: SignGuardComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
