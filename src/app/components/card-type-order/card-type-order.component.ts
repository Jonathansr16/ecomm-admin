import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { dataStat } from 'src/app/core/interface/stats.interface';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SkeletonModule } from 'primeng/skeleton';
import { StateTypeOrder } from 'src/app/core/interface/state-type-order.interface';

@Component({
  selector: 'app-card-type-order',
  standalone: true,
  imports: [
    CommonModule,
    OverlayPanelModule,
    SkeletonModule
  ],
 templateUrl: './card-type-order.component.html',
  styleUrl: './card-type-order.component.scss',
})
export class CardTypeOrderComponent {
typeOrderData = input.required<StateTypeOrder[]>();
emitEvent = output<any>();


executeCommand(data: dataStat) {
  if (data.command) {
    data.command();
  }
}
 }


