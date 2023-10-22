import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';

import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    AuthRoutingModule,
    ButtonModule,
    CardModule,
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    RippleModule
  ]
})
export class AuthModule { }
