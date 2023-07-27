import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit{

  @ViewChild('container') container: ElementRef | undefined;
  @ViewChild('btnRegister') btnRegister: ElementRef | undefined;
  @ViewChild('btnLogin') btnLogin: ElementRef | undefined;

    // @ts-ignore
  formLogin : FormGroup

  constructor(private formBuilder: FormBuilder, private renderer2: Renderer2, public auth: AuthService) {
      this.createFormRegister();
   }

   //*GET DATA REGISTER FORM
   get emailValido() {
    return this.formLogin.get('email')?.invalid && this.formLogin.get('email')?.touched;
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

  createFormRegister() {
    this.formLogin = this.formBuilder.group({

      email: ['', [Validators.required, Validators.minLength(8)]],
      remember: ['',],
    })
  }

  register() {


  }

  login() {

  }


}
