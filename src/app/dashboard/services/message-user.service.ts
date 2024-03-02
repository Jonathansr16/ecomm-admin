import { Injectable } from '@angular/core';
import { MessageUser } from 'src/app/core/interface/message-user.model';

@Injectable({
  providedIn: 'root'
})
export class MessageUserService {

  constructor() { }

  messages: MessageUser[] = [

    {
      avatar: 'assets/img/user_1.png',
      user: 'Rodrigo Diaz',
      description: 'Memoria dejo de funcionar',
      time: '09:08 AM 1/08/2023'
    },

    {
      avatar: 'assets/img/user_2.png',
      user: 'Maria delgado',
      description: 'Solicito factura',
      time: '12:08 PM 1/08/2023'
    },

    {
      avatar: 'assets/img/user_3.png',
      user: 'Valentin Dominguez',
      description: 'Necesito ayuda',
      time: '12:08 PM 1/08/2023'
    },

    {
      avatar: 'assets/img/user_1.png',
      user: 'Jose Guadalupe',
      description: 'Solicito factura',
      time: '12:08 PM 1/08/2023'
    }
  ];


  getMessageUser(): MessageUser[] {
    return this.messages;
  }



}
