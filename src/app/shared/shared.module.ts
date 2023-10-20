import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';

import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,
    MenubarModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class SharedModule { }
