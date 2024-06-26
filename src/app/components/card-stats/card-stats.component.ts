import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { dataStat } from 'src/app/core/interface/stats.interface';

@Component({
  selector: 'app-card-stats',
  standalone: true,
  imports: [
    CommonModule,
    SkeletonModule
  ],
  template: `

<div class="cards-stat__container text-gray-600 body-font shadow-slate-300 mx-auto">
  <div class="cards-stat grid grid-cols-1 lg:grid-cols-2">

    @for(data of dataCard(); track $index) {

      <div class="card-stat cursor-pointer" class="flex flex-row px-6 py-6 rounded-3xl shadow-md bg-white"
        (click)="executeCommand(data)">
        <span *ngIf="data.icon || data.iconClass"
          class="card-stat__icon-box w-11 h-11 mr-3 flex items-center justify-center rounded-xl"
          [class]="data.backgroundIconClass">
          <i class="card-stat__icon w-7 h-7" class="{{ data.iconClass }}">{{
            data.icon
            }}</i>
        </span>
  
        <div *ngIf="data.urlImage" class="card-stat__image-box ">
          <img class="w-10 h-10 object-cover object-center  mr-4" [src]="data.urlImage" alt="" />
        </div>
  
        <div>
          <h2 class="text-gray-500 title-font font-medium text-sm line-clamp-3">
            {{ data.label }}
          </h2>
          <p class="font-bold text-gray-700 text-2xl">
            {{ data.quantity | number }}
          </p>
        </div>
      </div>
    }

  </div>
</div>
`,
  styleUrls: ['./card-stats.component.scss']
})
export class CardStatsComponent {

  dataCard = input.required<dataStat[]>();

  executeCommand(data: dataStat) {
    if (data.command) {
      data.command();
    }
  }

}
