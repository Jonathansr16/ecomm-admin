import { AfterViewInit, Component,  OnInit,  Renderer2, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from '../../core/models/usuario.model';
import { AuthService } from '../services/auth.service';
import { ValidatorsService } from '../../core/services/validators.service';
import Swal from 'sweetalert2'
//*Librerias externas importadas

import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'login-auth',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.style.scss', './login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  usuario: UsuarioModel = new UsuarioModel();
  checkRemember: boolean = false;
  signInSubmitted: boolean = false

  // @ts-ignore
  formSignIn: FormGroup;

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

  login() {

    if (this.formSignIn.invalid) {
      return Object.values(this.formSignIn.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Valindando',
      text: 'Espere por favor...'
    });

    Swal.showLoading();

    this.authService.signIn(this.usuario).subscribe(data => {
      Swal.close();
    
      if(this.checkRemember) {
        localStorage.setItem('email', this.usuario.email);

        // console.log('se guardo email')
        
     
        //  this.formSignIn.reset({ emailLogin: this.usuario.email})
      } else {
      //  this.formSignIn.reset()
      console.log('no se guardo email')

      }
      this.router.navigateByUrl('/dashboard/home')
      
    }, (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al autenticar',
        text: error.error.error.message
      });
  
    })
  }








}
