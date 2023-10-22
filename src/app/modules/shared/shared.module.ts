import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    ButtonModule,
    CommonModule,
    InputTextModule,
    MenubarModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
