import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { UsuarioModel } from '../core/models/usuario.model';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit,AfterViewInit{

  @ViewChild('container') container: ElementRef | undefined;
  @ViewChild('btnRegister') btnRegister: ElementRef | undefined;
  @ViewChild('btnLogin') btnLogin: ElementRef | undefined;

  usuario: UsuarioModel = new UsuarioModel;


    // @ts-ignore
  formSignUp : FormGroup;
  // @ts-ignore
  formSignIn : FormGroup;
  constructor(private formBuilder: FormBuilder, private renderer2: Renderer2, private authService: AuthService ) {
      this.createformSignUp();
      this.createformSignIn();
   }

   //*GET DATA REGISTER FORM

   get nameRegisterInvalid() {
    return this.formSignUp.get('name')?.invalid && this.formSignUp.get('name')?.touched;
   }

   get lastNameInvalid() {
    return this.formSignUp.get('lastName')?.invalid && this.formSignUp.get('lastName')?.touched;
   }

   get emailRegisterInvalid() {
    return this.formSignUp.get('emailRegister')?.invalid && this.formSignUp.get('emailRegister')?.touched;
   }

  get pass1Invalid() {
    return this.formSignUp.get('pass1')?.invalid && this.formSignUp.get('pass1')?.touched;
  }


  //*GET DATA LOGIN FORM
  get emaiLoginlInvalid() {
    return this.formSignIn.get('emailLogin')?.invalid && this.formSignIn.get('emailLogin')?.touched;
  }

  get passLoginInvalid() {
    return this.formSignIn.get('passLogin')?.invalid && this.formSignIn.get('passLogin')?.touched;
  }


  ngOnInit(): void {
      this.usuario= new UsuarioModel();
  }

  ngAfterViewInit(): void {
    this.loginRegister()
  }

  loginRegister(): void {
    const contenedor = this.container?.nativeElement;
    const register = this.btnRegister?.nativeElement;
    const login = this.btnLogin?.nativeElement;

    this.renderer2.listen(register, "click", () => this.renderer2.addClass(contenedor, "registro-mode"));
    this.renderer2.listen(login, "click", () => this.renderer2.removeClass(contenedor, "registro-mode"));
  }

//*CREAR FORMULARIO REGISTRO
  createformSignUp(): void {
    this.formSignUp = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(8)]],
      emailRegister: ['', [Validators.required, Validators.minLength(8)]],
      pass1: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  //* CREAR FORMULARIO LOGIN
  createformSignIn(): void {
    this.formSignIn = this.formBuilder.group({
      emailLogin: ['', [Validators.required, Validators.minLength(6)]],
      passLogin: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  login() {

    if(this.formSignIn.invalid) {
      return Object.values(this.formSignIn.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    this.authService.signIn(this.usuario).subscribe( data => {
      console.log(data)
    }, (error) => {
      console.log(error)
    })
  }

  register() {

    if(this.formSignUp.invalid) {
      return Object.values(this.formSignUp.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    this.authService.signUp(this.usuario).subscribe(data => {
      console.log(data);
    });


   
  }


}
