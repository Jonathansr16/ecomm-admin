import { HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { SHA256 } from "crypto-js";
import { environment } from "src/environments/environment.development";

export const DataTimeInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next) => {

  const today = new Date();
  const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()
  const month = today.getMonth() < 10 ? `0${today.getMonth() +1 }` : today.getMonth() +1;
  const year = today.getFullYear();
  const hour = today.getHours() < 10 ? `0${today.getHours()}` : today.getHours()
  const minutes = today.getMinutes()  < 10 ? `0${today.getMinutes()}` : today.getMinutes();
  const seconds = today.getSeconds() < 10 ? `0${today.getSeconds()}` : today.getSeconds();
  const time = `${year}-${month}-${day}T${hour}:${minutes}:${seconds}`;

  const url = environment.claro.apiBase;
  const dataSing = environment.claro.public_key + time + environment.claro.private_key;
  const signature = SHA256(dataSing)
  const modifiedUrl = `${url}/${environment.claro.public_key}/${signature}/${time}/${req.url}`;


const modifiedUr = req.clone({
    url: modifiedUrl
});

return next(modifiedUr)
}



    
