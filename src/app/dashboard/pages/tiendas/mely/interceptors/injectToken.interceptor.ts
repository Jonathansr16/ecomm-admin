import type {HttpInterceptorFn } from '@angular/common/http';

import { environment } from 'src/environments/environment.development';

const urlBase = environment.mely.url;
const token = environment.mely.access_token;

export const injectTokenInterceptor: HttpInterceptorFn = (req, next) => {
  
  //  const allUrl = `${urlBase}/${req.url}`

const request = req.clone({
  //  headers: req.headers.set('Authorization', `Bearer ${token}`),
  setHeaders: {
    'Authorization': `Bearer ${token}`
  },

  // url: allUrl
  
});

  return next(request)


};



