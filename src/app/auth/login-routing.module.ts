import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './logincomponent';


const loginRoutes: Routes = 
  [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },

    { path: '', component: LoginComponent },  
  ];

@NgModule({
    imports: [RouterModule.forChild(loginRoutes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }