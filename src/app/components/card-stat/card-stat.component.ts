import { StatusBtn } from 'src/app/core/interface/statusBtn.interface';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, input, output } from '@angular/core';
import { dataStat } from 'src/app/core/interface/stats.interface';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-card-stat',
  standalone: true,
  imports: [
    CommonModule,
    OverlayPanelModule,
    TableModule
  ],
 templateUrl: './card-stat.component.html',
  styleUrl: './card-stat.component.scss',
})
export class CardStatComponent {

dataCard = input.required<dataStat[]>();
titleSection = input.required<string>();
klassCard = input.required<string>();
klassContainer = input.required<string>();

// @Input() dataTable: any[] = [];
emitEvent = output<any>();


executeCommand(data: dataStat) {
  if (data.command) {
    data.command();
  }
}
 }

