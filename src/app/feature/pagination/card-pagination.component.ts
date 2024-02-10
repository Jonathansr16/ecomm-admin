import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-card-pagination',
  standalone: true,
  imports: [CommonModule, PaginatorModule, ],
  templateUrl: './card-pagination.component.html',
  styleUrls: ['./card-pagination.component.css']
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
