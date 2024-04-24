import { HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { SHA256 } from "crypto-js";
import { environment } from "src/environments/environment.development";

export const DataTimeInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next) => {


  const formatDate = (date: Date): string =>  {
    const pad = (n: number) => n < 10 ? '0' + n : n.toString();
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours() +1);
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  
  }


  const currentTime = new Date();
  const formattedTime = formatDate(currentTime);
  const dataString = environment.claro.public_key + formattedTime + environment.claro.private_key;
  const asignature = SHA256(dataString).toString();
  const url = environment.claro.apiBase;

  const modifiedUrl = `${environment.claro.apiBase}/${environment.claro.public_key}/${asignature}/${formattedTime}/${req.url}`;

const modifiedUr = req.clone({
    url: modifiedUrl
});

return next(modifiedUr);



}

