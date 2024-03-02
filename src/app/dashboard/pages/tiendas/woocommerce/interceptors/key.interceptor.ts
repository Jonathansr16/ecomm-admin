import {
  HttpRequest,
  HttpEvent,
  HttpHandlerFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';


export function keyInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {


    const reqWithParams = request.clone({
      params: request.params
      .set('consumer_key', environment.wcommerce.client_key)
      .set('consumer_secret', environment.wcommerce.secret_key)
    })

    return next(reqWithParams)
}