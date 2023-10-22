import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';

import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    AuthRoutingModule,
    ButtonModule,
    CardModule,
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    RippleModule,
    ToastModule
  ]
})
export class AuthModule { }
