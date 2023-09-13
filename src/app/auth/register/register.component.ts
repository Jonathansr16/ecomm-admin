import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { UsuarioModel } from 'src/app/core/models/usuario.model';
import { ValidatorsService } from 'src/app/core/services/validators.service';

import Swal from 'sweetalert2'
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.style.scss', './register.component.scss']
})
export class RegisterComponent  implements OnInit, OnDestroy{

  signUpSubmitted: boolean = false;
  checkTerminos: boolean = false;
    // @ts-ignore
    formSignUp: FormGroup;

  usuario: UsuarioModel = new UsuarioModel();
   
  constructor (@Inject(DOCUMENT) private document: Document,  private renderer2: Renderer2, private formBuilder: FormBuilder,  private validatorsService: ValidatorsService,  private authService: AuthService) {
    this.createformSignUp();

  }


  ngOnInit(): void {
    this.renderer2.setStyle(this.document.body, "background-color", "#172b4d")

  }

  ngOnDestroy(): void {
    this.renderer2.removeStyle(this.document.body, "background-color")

  }

  //*CREAR FORMULARIO REGISTRO
  createformSignUp(): void {
    this.formSignUp = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(8), this.validatorsService.notWhitesSpaceValid]],
      emailRegister: ['', [Validators.required, Validators.minLength(8), this.validatorsService.notWhitesSpaceValid]],
      pass1: ['', [Validators.required, Validators.minLength(8), this.validatorsService.notWhitesSpaceValid]],
      pass2: ['', [Validators.required, Validators.minLength(8), this.validatorsService.notWhitesSpaceValid]],
      aceptTerm: ['', [Validators.required]]
    }, {
      Validators: this.validatorsService.passwordsNotEquals('pass1', 'pass2')
    });

  
  }

  get passNotEquals() {
    const pass1 = this.formSignUp.get('pass1')?.value;
    const pass2 = this.formSignUp.get('pass2')?.value;

    if( (pass1 !== pass2) && this.signUpSubmitted) {
      return true;
    } else {
      return false;
    }
  }


    //*GET DATA REGISTER FORM
    get fullNameInvalid() {
      return this.formSignUp.get('fullName')?.invalid && this.formSignUp.get('fullName')?.touched;
    }
  
    get emailRegisterInvalid() {
      return this.formSignUp.get('emailRegister')?.invalid && this.formSignUp.get('emailRegister')?.touched;
    }
  
    get pass1Invalid() {
      return this.formSignUp.get('pass1')?.invalid && this.formSignUp.get('pass1')?.touched;
    }
  
    get passwordsInvalid() {
      const pass1 = this.formSignUp.get('pass1')?.value;
      const pass2 = this.formSignUp.get('pass2')?.value
  
      return ( pass1 === pass2 ) ? false : true;
    }
  
    get termInvalid() {
      return this.formSignUp.get('aceptTerm')?.invalid && this.formSignUp.get('aceptTerm')?.touched;
    }
  
  register() {

    if (this.formSignUp.invalid) {
      return Object.values(this.formSignUp.controls).forEach( (control: any) => {
        control.markAsTouched();
      });
    }


    const formValues = this.formSignUp.value;
    // this.formSignUp.valueChanges.subscribe( (formValues: any) => {

      this.usuario.fullName= formValues.fullName;
      this.usuario.email = formValues.emailRegister;
      this.usuario.password = formValues.pass1;
      this.checkTerminos = formValues.aceptTerm;
 

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Validando datos',
      text: 'Espere por favor...'
    });

   Swal.showLoading();

    this.authService.signUp(this.usuario).subscribe(data => {
 
      // console.log(this.usuario);
     Swal.fire({
        allowOutsideClick: true,
        icon: 'success',
        title: 'Registro echo con exito',
      });

      // if( this.recordarRegistro ) {
      //   localStorage.setItem('email', this.usuario.email);
      // }

      this.formSignUp.reset();
  
    }, (error) => {
       Swal.fire({
        icon: 'error',
        title: 'Se produjo un error',
        text: error.error.error.message
      });

    });
  }

}
