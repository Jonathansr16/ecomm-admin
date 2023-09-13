import { NgModule } from '@angular/core';

//* COMPONENT
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthRoutingModule } from '@auth/auth-routing.module';
import { SharedNgPrimeModule} from '@shared/shared-ng-prime.module';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
@NgModule({
  declarations: [
  RegisterComponent,
  LoginComponent,
  HeaderComponent,
  FooterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedNgPrimeModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    DividerModule,
    CheckboxModule
  ]
})
export class LoginModule { }
