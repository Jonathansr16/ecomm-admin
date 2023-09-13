import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const loginRoutes: Routes = 
  [
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },  
    { path: 'register', component: RegisterComponent }

  ];

@NgModule({
    imports: [RouterModule.forChild(loginRoutes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }