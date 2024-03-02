import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CardModule],
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.scss']
})
export default class AyudaComponent {

}
