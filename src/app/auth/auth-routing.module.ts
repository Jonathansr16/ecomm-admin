import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';


const loginRoutes: Routes = 
  [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },

    { path: '', component: AuthComponent },  
  ];

@NgModule({
    imports: [RouterModule.forChild(loginRoutes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }