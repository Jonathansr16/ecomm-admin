
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// Import the AuthService type from the SDK
import { UsuarioModel } from 'src/app/core/models/usuario.model';
import { environment } from '../../../environments/environment.development';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string= 'https://identitytoolkit.googleapis.com/v1';
  private apiuri = environment.firebase.apiKey;
  private userToken: string | undefined;

  //CREAR USUARIO
  // private signUpUrl: string= 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]';
  
  //LOGIN USUARIO
  // private signInUrl: string= 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]';

  constructor(private http: HttpClient) {
    this.readToken();
   }

  signIn(user: UsuarioModel) {
    const authData = {
      ...user,
      returnSecureToken	: true
    };

    return this.http.post(`
    ${ this.url }/accounts:signInWithPassword?key=${ this.apiuri }`, authData).pipe(
      map( (resp: any) => {
        this.saveToken(resp['idToken'])
    }));
  }

  signUp(user: UsuarioModel) {

    const authData = {
      ...user,
      returnSecureToken	: true
    };

    return this.http.post(
      `${ this.url }/accounts:signUp?key=${ this.apiuri }`,authData).pipe(
      map( (resp: any) => {
        this.saveToken(resp['idToken']);
        return resp;
      })
    )
  }

  logout(){
    localStorage.removeItem('token')
  }

 private saveToken(idToken : string) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  private readToken() {

    if(localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token') as string;
    } else {
      this.userToken = '';
    }
  }

}
