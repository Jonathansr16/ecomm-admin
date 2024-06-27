import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProductInventory } from 'src/app/core/interface/product.interface';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import {  DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { CheckboxModule } from 'primeng/checkbox';

import { ValidatorsService } from 'src/app/core/services/validators.service';
import { SafeHtmlPipe } from 'src/app/core/pipes/safe-html.pipe';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-massive-edition',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    FormsModule,
    ReactiveFormsModule,
    SafeHtmlPipe,
    InputTextModule,
    DialogModule,
    MenuModule,
    CheckboxModule,
    InputTextareaModule
  ],
  providers: [],
  templateUrl: './massive-editor.component.html',
  styleUrl: './massive-editor.component.scss',
})
export class MassiveEditorComponent {
  data = input.required<ProductInventory[]>();
  // @ViewChildren(OverlayPanel) panels!: QueryList<OverlayPanel>;

  selectedCell = { row: -1, col: -1 };
  clickedCell = { row: -1, col: -1 };
  formTable!: FormGroup;

  formBuilder = inject(FormBuilder);
  validatorService = inject(ValidatorsService);


  createProductForm() {
    this.formTable = this.formBuilder.group({
      rows: this.formBuilder.array([]),
    });
  }

  isVisibleMenuFilter = false;
  isVisiblePanelDesc : boolean[] = []
  isChecked = false;

  stateCellData = signal<HeaderTable[]>([
    {
      label: 'Imagenes',
      visibility: true,
    },

    {
      label: 'Titulo',
      visibility: true,
    },

    {
      label: 'Sku',
      visibility: true,
    },

    {
      label: 'Descripción',
      visibility: false,
    },


    {
      label: 'Precio regular',
      visibility: true,
    },

    {
      label: 'Precio de oferta',
      visibility: true,
    },

    {
      label: 'Unidades',
      visibility: true
    },

    {
      label: 'Estatus',
      visibility: true,
    },

    {
      label: 'Canal',
      visibility: true,
    },
  ]);

  cellData = computed( () => this.stateCellData())

  ngOnInit(): void {
    this.createProductForm();
    this.loadData();
  }

  isValidField(field: string) {
    return (
      this.formTable.get(field)?.invalid && this.formTable.get(field)?.touched
    );
  }

  isValidCell(row: number, field: string) {
    const control = this.formArr.at(row).get(field);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
    // return this.formTable.get(field)?.invalid && this.formTable.get(field)?.touched;
  }

  handlerSelection(row: number, col: number) {
    this.selectedCell = { row, col };
  }

  isSelectedCell(row: number, col: number): boolean {
    return this.selectedCell.row === row && this.selectedCell.col === col;
  }

  handlerClickedSelection(row: number, col: number) {
    this.clickedCell = { row, col };
  }

  isClickedCell(row: number, col: number): boolean {
    return this.clickedCell.row === row && this.clickedCell.col === col;
  }

  get formArr() {
    return this.formTable.get('rows') as FormArray;
  }

  updateData() {
    console.log(this.formArr);
  }

  loadData() {
    this.data().forEach((row) => {
      this.formArr.push(this.addRow(row));
    });
  }

  addRow(obj: ProductInventory) {
    return this.formBuilder.group({
      img: [
        obj.img ? obj.img.url : '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60),
        ],
      ],
      title: [
        obj.title,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60),
        ],
      ],
      description: [
        obj.description,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(2000),
        ],
      ],
      sku: [obj.sku, [Validators.required, Validators.minLength(3)]],
      regular_price: [obj.regular_price, [Validators.required]],
      sale_price: [obj.sale_price, [Validators.required]],
      stock: [obj.stock],
      status: [obj.status],
      store: [obj.store, [Validators.required]],
    });
  }


  getDescriptionValue(rowIndex: number): string {
    const description = this.formArr.at(rowIndex).get('description')?.value;
    return Array.isArray(description) ? description.join(', ') : (description ?? '').toString();
  }

  togglePanelDesc(row: number): boolean {
  
   return this.isVisiblePanelDesc[row] = !this.isVisiblePanelDesc[row];

  }

}

interface HeaderTable {
  label: string;
  visibility: boolean;
}

interface visibilityCell {
  images: boolean;
  title: boolean;
  description: boolean;
  sku: boolean;
  regular_price: boolean;
  sale_price: boolean;
  status: boolean;
  channel: boolean;
}

/* 


*/
