import { StatusBtn } from 'src/app/core/interface/statusBtn.interface';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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

@Input( {required: true}) dataCard: dataStat[] = [];
@Input() titleSection!: string;
@Input( {required: true}) klassCard!: string ;
@Input( {required: true}) klassContainer!: string ;
@Input() dataTable: any[] = [];

@Output() OpenPanel = new EventEmitter<any>();

openDialog() {

}
 }

