import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SHA256 } from 'crypto-js';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class DataTimeInterceptor implements HttpInterceptor {

    private getFormattedDate(date: Date): string {
        const dd = this.formatWithLeadingZero(date.getDate());
        const mm = this.formatWithLeadingZero(date.getMonth() + 1); // Enero es 0
        const yyyy = date.getFullYear();
        const h = this.formatWithLeadingZero(date.getHours());
        const m = this.formatWithLeadingZero(date.getMinutes());
        const s = this.formatWithLeadingZero(date.getSeconds());

        return `${yyyy}-${mm}-${dd}T${h}:${m}:${s}`;
    }

    private formatWithLeadingZero(value: number): string {
        return value < 10 ? `0${value}` : `${value}`;
    }



    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        // Aquí puedes agregar la lógica para agregar la fecha y hora a la solicitud
        const today = new Date();
        const formattedDate = this.getFormattedDate(today);
        const dataSing = environment.claro.public_key + formattedDate + environment.claro.private_key;
        const signature = SHA256(dataSing).toString();
        const url = 'https://selfservice.claroshop.com/apicm/v1';
        const modifiedUrl =`${url}/${environment.claro.public_key}/${signature}/${formattedDate}/${request.url}`;

       
        // Clona la solicitud y agrega la fecha y hora a la URL
        const modifiedReq = request.clone({
            url: modifiedUrl,
            
        });

        return next.handle(modifiedReq);
    }


}
