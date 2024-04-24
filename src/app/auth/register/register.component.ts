import { Component, OnDestroy, OnInit, Renderer2, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { UsuarioModel } from '@auth/models/usuario.model';
import { ValidatorsService } from 'src/app/core/services/validators.service';

import { CommonModule, DOCUMENT } from '@angular/common';
import { HeaderComponent } from '@auth/components/header/header.component';
import { FooterComponent } from '@auth/components/footer/footer.component';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
    PasswordModule,
    CheckboxModule,
    HeaderComponent,
    FooterComponent,
    ToastModule,
  ],
  providers:[MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export default class RegisterComponent implements OnInit, OnDestroy {
  signUpSubmitted: boolean = false;
  checkTerminos: boolean = false;
  // @ts-ignore
  formSignUp: FormGroup;

  usuario: UsuarioModel = new UsuarioModel();
  showLoader = false;

  //*CREAR FORMULARIO REGISTRO
  createformSignUp(): void {
    this.formSignUp = this.formBuilder.group(
      {
        fullName: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            this.validatorsService.notWhitesSpaceValid,
          ],
        ],
        emailRegister: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            this.validatorsService.notWhitesSpaceValid,
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            this.validatorsService.notWhitesSpaceValid,
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            this.validatorsService.notWhitesSpaceValid,
          ],
        ],
        aceptTerm: ['', [Validators.required]],
      },
      {
        validator: this.validatorsService.matchValidator(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

 private readonly document: Document = inject(DOCUMENT);
 private readonly renderer2 = inject(Renderer2);
 private readonly formBuilder = inject(FormBuilder);
 private readonly validatorsService = inject(ValidatorsService);
 private readonly authService = inject(AuthService);
 private readonly messageService = inject(MessageService);

  constructor() {
    this.createformSignUp();
  }

  ngOnInit(): void {
    this.renderer2.setStyle(this.document.body, 'background-color', '#172b4d');
  }

  ngOnDestroy(): void {
    this.renderer2.removeStyle(this.document.body, 'background-color');
  }

  //*GET DATA REGISTER FORM
  get fullNameInvalid() {
    return (
      this.formSignUp.get('fullName')?.invalid &&
      this.formSignUp.get('fullName')?.touched
    );
  }

  get emailRegisterInvalid() {
    return (
      this.formSignUp.get('emailRegister')?.invalid &&
      this.formSignUp.get('emailRegister')?.touched
    );
  }

  get pass1Invalid() {
    return (
      this.formSignUp.get('password')?.invalid &&
      this.formSignUp.get('password')?.touched
    );
  }

  get matchInvalid() {
    const pass1 = this.formSignUp.get('password')?.value;
    const pass2 = this.formSignUp.get('confirmPassword')?.value;

    return pass1 === pass2 ? false : true;
  }

  get termInvalid() {
    return (
      this.formSignUp.get('aceptTerm')?.invalid &&
      this.formSignUp.get('aceptTerm')?.touched
    );
  }

  register() {
    if (this.formSignUp.invalid) {
      return Object.values(this.formSignUp.controls).forEach((control: any) => {
        control.markAsTouched();
      });
    }

    this.showLoader = true;
    const formValues = this.formSignUp.value;

    this.usuario.fullName = formValues.fullName;
    this.usuario.email = formValues.emailRegister;
    this.usuario.password = formValues.pass1;
    this.checkTerminos = formValues.aceptTerm;


    setTimeout( () => {
        this.showLoader = false;

        this.messageService.add( {
          key: 'tc',
          severity: 'success',
          summary: 'Exito!',
          detail: 'Su registro fue echa con exito!'
        });

    }, 3000)

    // this.authService.signUp(this.usuario).subscribe(
    //   (data) => {
    //     this.showLoader = false;

    //     this.messageService.add( {
    //       key: 'tc',
    //       severity: 'success',
    //       summary: 'Exito!',
    //       detail: 'Su registro fue echa con exito!'
    //     });

    //     this.formSignUp.reset();
    //   },
    //   (error) => {
    //     this.showLoader = false;
    //     this.messageService.add( {
    //       key: 'tc',
    //       severity: 'error',
    //       summary: 'Error!',
    //       detail: 'UPS! Se ha producido un error'
    //     });
  
    //   }
    // );
  }
}
