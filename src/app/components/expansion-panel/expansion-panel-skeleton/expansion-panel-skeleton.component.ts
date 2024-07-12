import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-expansion-panel-skeleton',
  standalone: true,
  imports: [
    CommonModule,
    SkeletonModule
  ],
  template: `
       @for (_ of [1,2]; track _) { 

         <div class="skeleton__card bg-white p-8 flex flex-row gap-4 justify-between items-center mb-10">
           
             <div  class="skeleton__title">
               <p-skeleton width="30rem" height="2rem" styleClass="mb-4"></p-skeleton>
               <p-skeleton width="30rem" height="2rem" styleClass="mb-2"></p-skeleton>
             </div>
     
             <div class="skeleton__icon">
             <p-skeleton size="2.5rem" styleClass="mr-2" />
     
             </div>
         
         </div>
       }
  `,
  styleUrl: './expansion-panel-skeleton.component.scss',
})
export class ExpansionPanelSkeletonComponent { }
