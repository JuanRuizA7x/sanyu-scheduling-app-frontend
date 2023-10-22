import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignWorkShiftComponent } from './components/assign-work-shift/assign-work-shift.component';

const routes: Routes = [
  {
    path: 'assign-work-shift',
    component: AssignWorkShiftComponent
  },
  {
    path: '**',
    redirectTo: 'assign-work-shift'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
