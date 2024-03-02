import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import {FormBuilder, FormGroup,  FormsModule,  ReactiveFormsModule,  Validators } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { UsuarioModel } from '@auth/models/usuario.model'; 
import { ValidatorsService } from 'src/app/core/services/validators.service';

import { CommonModule, DOCUMENT } from '@angular/common';
import { HeaderComponent } from '@auth/components/header/header.component';
import { FooterComponent } from '@auth/components/footer/footer.component';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ 
    CommonModule, 
    ReactiveFormsModule,
    ButtonModule, 
    PasswordModule, 
    HeaderComponent, 
    FooterComponent],
  templateUrl: './register.component.html',
  styleUrls: ['../auth.style.scss', './register.component.scss']
})
export default class RegisterComponent  implements OnInit, OnDestroy{

  signUpSubmitted: boolean = false;
  checkTerminos: boolean = false;
    // @ts-ignore
    formSignUp: FormGroup;

  usuario: UsuarioModel = new UsuarioModel();
   
   //*CREAR FORMULARIO REGISTRO
   createformSignUp(): void {
    this.formSignUp = this.formBuilder.group({
      fullName:        ['', [Validators.required, Validators.minLength(8), this.validatorsService.notWhitesSpaceValid]],
      emailRegister:   ['', [Validators.required, Validators.minLength(8), this.validatorsService.notWhitesSpaceValid]],
      password:        ['', [Validators.required, Validators.minLength(8), this.validatorsService.notWhitesSpaceValid]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), this.validatorsService.notWhitesSpaceValid]],
      aceptTerm:       ['', [Validators.required                                                                     ]]
    }, {
      validator: this.validatorsService.matchValidator('password', 'confirmPassword')
    });
  
  }

  
  constructor (@Inject(DOCUMENT) private document: Document,  private renderer2: Renderer2, private formBuilder: FormBuilder,  private validatorsService: ValidatorsService,  private authService: AuthService) {
    this.createformSignUp();

  }


  ngOnInit(): void {
    this.renderer2.setStyle(this.document.body, "background-color", "#172b4d")

  }

  ngOnDestroy(): void {
    this.renderer2.removeStyle(this.document.body, "background-color")

  }

    //*GET DATA REGISTER FORM
    get fullNameInvalid() {
      return this.formSignUp.get('fullName')?.invalid && this.formSignUp.get('fullName')?.touched;
    }
  
    get emailRegisterInvalid() {
      return this.formSignUp.get('emailRegister')?.invalid && this.formSignUp.get('emailRegister')?.touched;
    }
  
    get pass1Invalid() {
      return this.formSignUp.get('password')?.invalid && this.formSignUp.get('password')?.touched;
    }
  
    get matchInvalid() {
      const pass1 = this.formSignUp.get('password')?.value;
      const pass2 = this.formSignUp.get('confirmPassword')?.value;
  
      return  (pass1 === pass2) ? false : true;
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

    console.log(this.formSignUp )
    const formValues = this.formSignUp.value;

      this.usuario.fullName= formValues.fullName;
      this.usuario.email = formValues.emailRegister;
      this.usuario.password = formValues.pass1;
      this.checkTerminos = formValues.aceptTerm;
 

    // Swal.fire({
    //   allowOutsideClick: false,
    //   icon: 'info',
    //   title: 'Validando datos',
    //   text: 'Espere por favor...'
    // });

  //  Swal.showLoading();

    this.authService.signUp(this.usuario).subscribe(data => {
 
    //  Swal.fire({
    //     allowOutsideClick: true,
    //     icon: 'success',
    //     title: 'Registro echo con exito',
    //   });

    

      this.formSignUp.reset();
  
    }, (error) => {
      //  Swal.fire({
      //   icon: 'error',
      //   title: 'Se produjo un error',
      //   text: error.error.error.message
      // });

    });
  }

}
