import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './administrator-routing.module';
import { AssignWorkShiftComponent } from './components/assign-work-shift/assign-work-shift.component';



@NgModule({
  declarations: [
    AssignWorkShiftComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule
  ]
})
export class AdministratorModule { }
