import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from '../core/models/usuario.model';
import { AuthService } from './services/auth.service';
import { ValidatorsService } from './services/validators.service';

import Swal from 'sweetalert2'
//*Librerias externas importadas
import { Swiper, Autoplay, Pagination, Navigation, SwiperOptions, EffectFade } from 'swiper';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, AfterViewInit {

  @ViewChild('container') container: ElementRef | undefined;
  @ViewChildren('btnRegister') btnRegister: QueryList<ElementRef> | undefined;
  @ViewChildren('btnLogin') btnLogin: QueryList<ElementRef>| undefined;
  @ViewChild('carouselSignIn') carouselSignIn: ElementRef | undefined;
  @ViewChild('carouselSignUp') carouselSignUp: ElementRef | undefined;
  usuario: UsuarioModel = new UsuarioModel();
  checkRemember: boolean = false;
  checkTerminos: boolean = false;
  signUpSubmitted: boolean = false;
  signInSubmitted: boolean = false
  // @ts-ignore
  formSignUp: FormGroup;
  // @ts-ignore
  formSignIn: FormGroup;

  //*Config of carousel App
  private config: SwiperOptions = {
    modules: [Navigation, Pagination, Autoplay, EffectFade],
    loop: true,
    // effect: 'fade',
    grabCursor: true,
    // slidesPerView: 1,
    autoplay: {
      delay: 3000,
    },

    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    }

  }
  

  constructor(private formBuilder: FormBuilder, 
    private renderer2: Renderer2, 
    private router: Router, 
    private validatorsService: ValidatorsService, 
    private authService: AuthService) {

    this.createformSignUp();
    this.createformSignIn();
  }

  ngOnInit(): void {
    
    if(localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email') as string;
      this.checkRemember= true; 
    }

    // this.rememberEmail()
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



  // //*GET DATA LOGIN FORM
  get emaiLoginlInvalid() {
    return this.formSignIn.get('emailLogin')?.invalid && this.formSignIn.get('emailLogin')?.touched;
  }

  get passLoginInvalid() {
    return this.formSignIn.get('passLogin')?.invalid && this.formSignIn.get('passLogin')?.touched;
  }

  ngAfterViewInit(): void {
    this.animateForms();
    this.carouselRegister();
    this.carouselLogin()
  }

  animateForms(): void {
    const contenedor = this.container?.nativeElement;
    // const register = this.btnRegister?.nativeElement;
    // const login = this.btnLogin?.nativeElement;

    this.btnRegister?.forEach( (element : ElementRef <HTMLButtonElement>) => {
          const registroAnimate = element.nativeElement;

          this.renderer2.listen(registroAnimate, "click", () => {
          
            this.renderer2.addClass(contenedor, "registro-mode")

          }) 
    });

    this.btnLogin?.forEach( (element : ElementRef <HTMLButtonElement>) => {
      const loginAnimate = element.nativeElement;

      this.renderer2.listen(loginAnimate, "click", () => {
      
        this.renderer2.removeClass(contenedor, "registro-mode")

      }) 
});
    // this.renderer2.listen(register, "click", () => this.renderer2.addClass(contenedor, "registro-mode"));
    // this.renderer2.listen(login, "click", () => this.renderer2.removeClass(contenedor, "registro-mode"));
  }

  //*CREAR FORMULARIO REGISTRO
  createformSignUp(): void {
    this.formSignUp = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(8), this.notWhitesSpaceValid]],
      emailRegister: ['', [Validators.required, Validators.minLength(8), this.notWhitesSpaceValid]],
      pass1: ['', [Validators.required, Validators.minLength(8), this.notWhitesSpaceValid]],
      pass2: ['', [Validators.required, Validators.minLength(8), this.notWhitesSpaceValid]],
      aceptTerm: ['', [Validators.required]]
    }, {
      Validators: this.validatorsService.passwordsNotEquals('pass1', 'pass2')
    });

   this.formSignUp.valueChanges.subscribe( formValues => {

    this.usuario.fullName= formValues.fullName;
    this.usuario.email = formValues.emailRegister;
    this.usuario.password = formValues.pass1;
    this.checkTerminos = formValues.aceptTerm;
   });
  }

  //* CREAR FORMULARIO LOGIN
  createformSignIn(): void {
    this.formSignIn = this.formBuilder.group({
      emailLogin: ['', [Validators.required, Validators.minLength(6), this.notWhitesSpaceValid ]],
      passLogin: ['', [Validators.required, Validators.minLength(5), this.notWhitesSpaceValid]],
      rememberLogin: ['']
    });

    this.formSignIn.valueChanges.subscribe( formValues => {
      this.usuario.email= formValues.emailLogin;
      this.usuario.password = formValues.passLogin;
       this.checkRemember = formValues.rememberLogin;

      // console.log(this.checkRemember);
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

  register() {

    if (this.formSignUp.invalid) {
      return Object.values(this.formSignUp.controls).forEach(control => {
        control.markAsTouched();
      });
    }

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

  get passNotEquals() {
    const pass1 = this.formSignUp.get('pass1')?.value;
    const pass2 = this.formSignUp.get('pass2')?.value;

    if( (pass1 !== pass2) && this.signUpSubmitted) {
      return true;
    } else {
      return false;
    }
  }


  notWhitesSpaceValid(control: FormControl) {

    return (control.value || '').trim().length? null : { 'whitespace': true };       
  }

  carouselRegister(): void {
    const carousel = this. carouselSignUp?.nativeElement;
    new Swiper(carousel, this.config);
   
  }

  carouselLogin(): void {
    const carosuel = this.carouselSignIn?.nativeElement;

    new Swiper(carosuel, this.config)
  }


  // rememberEmail(): void {
  //   if(localStorage.getItem('email') && this.checkRemember) {
  //      this.formSignIn.reset({ emailLogin: this.usuario.email}) 
  //     } 
  // }
 
  // FieldInvalid( field: string): boolean {

  //   if(this.formSignIn.get(field)?.invalid && this.formSignIn.get(field)?.touched) {
  //     return true
  //   } else {
  //     return false;
  //   }
    
  // }

}
