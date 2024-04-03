import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
       <h3 class="font-bold text-2xl mb-3" [class]="title().style"> {{ title().title }} </h3>
  `,
  styleUrl: './title.component.scss',
})
export class TitleComponent {

  title = input.required<TitleSection>();
 }
