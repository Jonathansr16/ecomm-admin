import { Injectable } from '@angular/core';
import { homeAyuda } from '../interface/ayuda.model';

@Injectable({
  providedIn: 'root'
})
export class HomeAyudaService {

  constructor() { }

  private ayuda: homeAyuda[] = [

    {
      icon: 'pi pi-question-circle',
      title: ' Nuestros Comunicados'
    },
    
    {
        icon: 'pi pi-comments',
        title: 'Preguntas Frecuentes'
    },

    {
      icon: 'pi pi-book',
      title: 'Manuales de Usuario'
    },

    {
      icon: 'pi pi-video',
      title: 'Tutoriales'
    },


  ];


  getAyuda(): homeAyuda[] {
    return this.ayuda
  }

}
