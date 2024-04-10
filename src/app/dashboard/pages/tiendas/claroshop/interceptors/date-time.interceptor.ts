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



    
/*
{
    "totalpaginas": 1,
    "totalpendientes": 1,
    "totalregistros": "1",
    "listapendientes": [
        {
            "nopedido": "83539216",
            "estatus": "Pendiente",
            "fechacolocacion": "2024-04-07",
            "fechaautorizacion": "2024-04-07",
            "sku": "GBAPKMSP",
            "articulo": "Pok&eacute;mon Sapphire Gba Juego F&iacute;sico En Caja Con Protecci&oacute;n",
            "claroid": "2828788",
            "idpedidorelacion": "12035596",
            "fulfillment": false,
            "sla": "En tiempo de embarque",
            "comision": "69.86",
            "totalproducto": "499",
            "totalpedido": "499",
            "skuhijo": "GBAPKMSP",
            "channel": "SR",
            "transactionid": null
        }
    ],
    "versionConfig": "2.0.17112023-1.0",
    "versionAPP": "2.0.17112023-1.0",
    "tagManagerID": "GTM-5Q7VB6N",
    "tagManagerIDCS": "",
    "visibleMenuCV": true
}
*/