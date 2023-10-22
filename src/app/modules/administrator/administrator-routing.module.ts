import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignWorkShiftComponent } from './components/assign-work-shift/assign-work-shift.component';
import { ExtendScheduleComponent } from './components/extend-schedule/extend-schedule.component';
import { GenerateReportComponent } from './components/generate-report/generate-report.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';

const routes: Routes = [
  {
    path: 'assign-work-shift',
    component: AssignWorkShiftComponent
  },
  {
    path: 'extend-schedule',
    component: ExtendScheduleComponent
  },
  {
    path: 'generate-report',
    component: GenerateReportComponent
  },
  {
    path: 'upload-file',
    component: UploadFileComponent
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
export class AdministratorRoutingModule { }
