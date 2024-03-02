import { AfterViewInit, Component,  OnInit,  Renderer2, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
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

@Component({
  selector: 'login-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, PasswordModule, CheckboxModule, ButtonModule, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrls: ['../auth.style.scss', './login.component.scss']
})
export default class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  usuario: UsuarioModel = new UsuarioModel();
  checkRemember: boolean = false;
  signInSubmitted: boolean = false

  // @ts-ignore
  formSignIn: FormGroup;

    //* CREAR FORMULARIO LOGIN
    createformSignIn(): void {
      this.formSignIn = this.formBuilder.group({
        emailLogin: ['', [Validators.required, Validators.minLength(6), this.validatorsService.notWhitesSpaceValid]],
        passLogin: ['', [Validators.required, Validators.minLength(5), this.validatorsService.notWhitesSpaceValid]],
        rememberLogin: ['']
      });
  
      this.formSignIn.valueChanges.subscribe( formValues => {
        this.usuario.email= formValues.emailLogin;
        this.usuario.password = formValues.passLogin;
         this.checkRemember = formValues.rememberLogin;
  
      });
    }

  constructor(@Inject(DOCUMENT) private document: Document,
    private formBuilder: FormBuilder, 
    private renderer2: Renderer2, 
    private router: Router, 
    private validatorsService: ValidatorsService, 
    private authService: AuthService) {

    this.createformSignIn();
  }

  ngOnInit(): void {
    
    if(localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email') as string;
      this.checkRemember= true; 
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
    // Swal.fire({
    //   allowOutsideClick: false,
    //   icon: 'info',
    //   title: 'Valindando',
    //   text: 'Espere por favor...'
    // });

    // Swal.showLoading();

    this.authService.signIn(this.usuario).subscribe(data => {
      // Swal.close();
    
      if(this.checkRemember) {
        localStorage.setItem('email', this.usuario.email);

       
      } else {
    
      console.log('no se guardo email')

      }
      this.router.navigateByUrl('/dashboard/home')
      
    }, (error) => {
      console.log(error);
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Error al autenticar',
      //   text: error.error.error.message
      // });
  
    })
  }








}
