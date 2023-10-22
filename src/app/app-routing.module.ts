import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'administrator',
    loadChildren: () => import('./modules/administrator/administrator.module').then(m => m.AdministratorModule)
  },
  {
    path: 'contractor',
    loadChildren: () => import('./modules/contractor/contractor.module').then(m => m.ContractorModule)
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
