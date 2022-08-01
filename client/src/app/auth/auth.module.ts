import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignGuardComponent } from './sign-guard/sign-guard.component';


@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    SignGuardComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
