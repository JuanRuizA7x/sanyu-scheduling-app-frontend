import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotifyWorkShiftComponent } from './components/notify-work-shift/notify-work-shift.component';

const routes: Routes = [
  {
    path: 'notify-work-shift',
    component: NotifyWorkShiftComponent
  },
  {
    path: '**',
    redirectTo: 'notify-work-shift'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractorRoutingModule { }
