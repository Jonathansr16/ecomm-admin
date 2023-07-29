import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { UsuarioModel } from '../core/models/usuario.model';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,AfterViewInit{

  @ViewChild('container') container: ElementRef | undefined;
  @ViewChild('btnRegister') btnRegister: ElementRef | undefined;
  @ViewChild('btnLogin') btnLogin: ElementRef | undefined;

  usuario: UsuarioModel = new UsuarioModel;


    // @ts-ignore
  formLogin : FormGroup;
  // @ts-ignore
  formRegister : FormGroup;
  constructor(private formBuilder: FormBuilder, private renderer2: Renderer2, private loginService: LoginService ) {
      this.createFormRegister();
      this.createFormLogin();
   }

   //*GET DATA REGISTER FORM

   get nameValido() {
    return this.formRegister.get('name')?.invalid && this.formRegister.get('name')?.touched;
   }

   get lastNameValido() {
    return this.formRegister.get('lastName')?.invalid && this.formRegister.get('lastName')?.touched;
   }

   get emailValido() {
    return this.formRegister.get('email')?.invalid && this.formRegister.get('email')?.touched;
   }

  get pass1Valido() {
    return this.formRegister.get('pass1')?.invalid && this.formRegister.get('pass1')?.touched;
  }


  //*GET DATA LOGIN FORM
  get mailValido() {
    return this.formLogin.get('mail')?.invalid && this.formLogin.get('mail')?.touched;
  }

  get passwordValido() {
    return this.formLogin.get('password')?.invalid && this.formLogin.get('password')?.touched;
  }


  ngOnInit(): void {
      this.usuario= new UsuarioModel()
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
  createFormRegister(): void {
    this.formRegister = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.minLength(8)]],
      pass1: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  //* CREAR FORMULARIO LOGIN
  createFormLogin(): void {
    this.formLogin = this.formBuilder.group({
      mail: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }


  login() {

    if(this.formLogin.invalid) {
      return Object.values(this.formLogin.controls).forEach(control => {
        control.markAsTouched();
      });
    }

  }

  register() {

    if(this.formRegister.invalid) {
      return Object.values(this.formRegister.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    this.loginService.register(this.usuario).subscribe(data => {
      console.log(data)
    })
  }


}
