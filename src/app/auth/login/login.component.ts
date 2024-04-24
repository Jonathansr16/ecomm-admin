import { AfterViewInit, Component, OnInit, Renderer2, Inject, OnDestroy, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioModel } from '@auth/models/usuario.model';
import { AuthService } from '../services/auth.service';
import { ValidatorsService } from '../../core/services/validators.service';
//*Librerias externas importadas

import { CommonModule, DOCUMENT } from '@angular/common';
import { HeaderComponent } from '@auth/components/header/header.component';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { FooterComponent } from '@shared/footer/footer.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'login-auth',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    InputTextModule,
    InputGroupModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
    HeaderComponent,
    ToastModule
  ],

  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  usuario: UsuarioModel = new UsuarioModel();
  checkRemember: boolean = false;
  signInSubmitted: boolean = false

  isVisible: boolean = false;
  // @ts-ignore
  formSignIn: FormGroup;

  //* CREAR FORMULARIO LOGIN
  createformSignIn(): void {
    this.formSignIn = this.formBuilder.group({
      emailLogin: ['', [Validators.required, Validators.minLength(6), this.validatorsService.notWhitesSpaceValid]],
      passLogin: ['', [Validators.required, Validators.minLength(5), this.validatorsService.notWhitesSpaceValid]],
      rememberLogin: ['']
    });

    this.formSignIn.valueChanges.subscribe(formValues => {
      this.usuario.email = formValues.emailLogin;
      this.usuario.password = formValues.passLogin;
      this.checkRemember = formValues.rememberLogin;

    });
  }

  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly renderer2 = inject(Renderer2);
  private readonly formBuilder = inject(FormBuilder);
  private readonly validatorsService = inject(ValidatorsService);
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);

  constructor() {

    this.createformSignIn();
  }

  ngOnInit(): void {

    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email') as string;
      this.checkRemember = true;
    }

    this.renderer2.setStyle(this.document.body, "background-color", "#172b4d")
  }

  ngOnDestroy(): void {
    this.renderer2.removeStyle(this.document.body, "background-color")
  }

  // //*GET DATA LOGIN FORM
  get emaiLoginlInvalid() {
    return this.formSignIn.get('emailLogin')?.invalid && this.formSignIn.get('emailLogin')?.touched;
  }

  get passLoginInvalid() {
    return this.formSignIn.get('passLogin')?.invalid && this.formSignIn.get('passLogin')?.touched;
  }

  ngAfterViewInit(): void {

  }


  login() {

    if (this.formSignIn.invalid) {
      return Object.values(this.formSignIn.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    this.isVisible = true;

    this.authService.signIn(this.usuario).subscribe(data => {
      this.isVisible = false;

      this.messageService.add({
        key: 'tc',
        severity: 'success',
        summary: 'Exito!',
        detail: 'Su registro fue echa con exito!'
      });

      if (this.checkRemember) {
        localStorage.setItem('email', this.usuario.email);


      } else {

        console.log('no se guardo email')

      }
      this.router.navigateByUrl('/dashboard/home')

    }, (error) => {
      console.log(error);
      this.isVisible = false;
      this.messageService.add({
        key: 'tc',
        severity: 'error',
        summary: 'Error al Autenticar!',
        detail: error.error.error.message
      });


    })
  }








}
