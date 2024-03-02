import { Component, EventEmitter, Input, Output } from '@angular/core';

import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-card-pagination',
  standalone: true,
  imports: [PaginatorModule],
  template: `
    <div class="card-pagination container">
      <div class="card-pagination__left">
        <span class="woo-inventario__pagination__span">Filas por página</span>
        <p-dropdown
          [options]="quantityRecordsPerPage"
          [(ngModel)]="currentRowsPerPage"
          (ngModelChange)="currentPage = 0"
        ></p-dropdown>
      </div>
      <div class="card-pagination__right">
        <p-paginator
          [first]="currentPage"
          [rows]="currentRowsPerPage"
          [totalRecords]="totalRecords"
          [showPageLinks]="true"
          [showFirstLastIcon]="true"
          (onPageChange)="onPageChange($event)"
          [showJumpToPageDropdown]="true"
        >
        </p-paginator>
      </div>
    </div>
  `,
  styleUrl: './card-pagination.component.css'
})
export class CardPaginationComponent {
  @Input() currentRowsPerPage!: number;
  @Input() currentPage!: number;
  @Input() totalRecords!: number;
  @Input() quantityRecordsPerPage!: number[];
  @Output() pageChaged: EventEmitter<number> = new EventEmitter();

  onPageChange(event: PageEvent) {
    this.currentPage = event.first || 1;
    this.currentRowsPerPage = event.rows || 10;
    this.pageChaged.emit(this.currentRowsPerPage);
  }
}

interface PageEvent {
  first?: number;
  rows?: number;
  page?: number;
  pageCount?: number;
}
