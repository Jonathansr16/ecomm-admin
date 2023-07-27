import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('@auth/login.module').then(auth => auth.LoginModule)
  },

  {
    path: 'dashboard',
    loadChildren: () => import('@main/main.module').then(main => main.MainModule)
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
