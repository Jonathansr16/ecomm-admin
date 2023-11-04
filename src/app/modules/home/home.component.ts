import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { homeAyuda } from 'src/app/core/interface/ayuda.model';
import { WcommerceService } from '@wcommerce/services/wcommerce.service';
import { MenuItem } from 'primeng/api';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ayuda: homeAyuda[] = [];
  visible: boolean = false;
  // @ts-ignore
  form: FormGroup;



dataAuth: any = {}
  constructor( private formBuilder: FormBuilder, private wcService: WcommerceService) {

    this.createFormWcommerce();
    this.loadDataFormWC();
  }

  ngOnInit(): void {
    // this.ayuda = this.ayudaService.getAyuda();
  }

  showDialog() {
    this.visible = true;
  }

  //*GET DATA WCOMMERCE FORM
  // get idWcValido() { return this.form.get('idApp')?.invalid && this.form.get('idApp')?.touched }

  get idWcUserValido() { return this.form.get('idUser')?.invalid && this.form.get('idUser')?.touched }

  get urlStoreWCValido() { return this.form.get('urlStore')?.invalid && this.form.get('urlStore')?.touched }

  get nameAppValido() { return this.form.get('nameStore')?.invalid && this.form.get('nameStore')?.touched }

  get permisoValido() { return this.form.get('permiso')?.invalid && this.form.get('permiso')?.touched }

  get urlRedirectValido() { return this.form.get('urlRedirecto')?.invalid && this.form.get('urlRedirecto')?.touched }

  get callbackValido() { return this.form.get('urlCallback')?.invalid && this.form.get('urlCallback')?.touched}

  createFormWcommerce() {
    this.form = this.formBuilder.group({
      // idApp: ['', [Validators.required, Validators.minLength(1)]],
       idUser: ['', [Validators.required, Validators.minLength(1)]],
      urlStore: ['', [Validators.required, Validators.minLength(5)]],
      endpoint: new FormControl({ value: '/wc-auth/v1/authorize', disabled: true }, Validators.required),
      nameStore: ['', [Validators.required, Validators.minLength(3)]],
      permiso: ['', Validators.required],
      urlRedirecto: ['', [Validators.required, Validators.minLength(5)]],
      urlCallback: ['', [Validators.required, Validators.minLength(5)]]
    })
  }


  loadDataFormWC() {
    this.form.reset({
      endpoint: '/wc-auth/v1/authorize'
    });
  }

  integrarWc() {

    if (this.form.invalid) {

      return Object.values(this.form.controls).forEach(control => {

        control.markAsTouched();
       
      });
    }





    this.form.reset({
      endpoint: '/wc-auth/v1/authorize'
    });

   

  }

}
