
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// Import the AuthService type from the SDK
import { UsuarioModel } from 'src/app/core/models/usuario.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiuri = environment.firebase.apiKey;

  private url: string= 'https://identitytoolkit.googleapis.com/v1/'
  //CREAR USUARIO
  private signUpUrl: string= 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]';
  
  //LOGIN USUARIO
  private signInUrl: string= 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]';



  constructor(private http: HttpClient) { }

  logout(){}

  login(user: UsuarioModel) {}

  register(user: UsuarioModel) {

    const authData = {
      ...user,
      returnSecureToken	: true
    };

    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiuri}`,
      authData
    )

  }


}
