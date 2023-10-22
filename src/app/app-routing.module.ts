import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { administratorGuard } from './modules/administrator/guards/administrator.guard';
import { contractorGuard } from './modules/contractor/guards/contractor.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'administrator',
    loadChildren: () => import('./modules/administrator/administrator.module').then(m => m.AdministratorModule),
    canActivateChild: [ administratorGuard ]
  },
  {
    path: 'contractor',
    loadChildren: () => import('./modules/contractor/contractor.module').then(m => m.ContractorModule),
    canActivateChild: [ contractorGuard ]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
