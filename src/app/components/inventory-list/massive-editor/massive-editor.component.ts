import { CommonModule } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProductInventory } from 'src/app/core/interface/product.interface';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ValidatorsService } from 'src/app/core/services/validators.service';
@Component({
  selector: 'app-massive-edition',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './massive-editor.component.html',
  styleUrl: './massive-editor.component.scss',
})
export class MassiveEditorComponent {

  @Input() data: ProductInventory[] = [];

  // selectedCell = signal<{ row: number | null, col: number | null }>({ row: null, col: null });
  // clickedCell =  signal< {row: number | null, col: number | null} >({row: null, col: null});

  selectedCell = { row: -1, col: -1 };
  clickedCell = { row: -1, col: -1 };

  headersData: HeaderTable[] = [
    {
      label: 'Imagen'
    },

    {
      label: 'Producto'
    },

    {
      label: 'Sku'
    },

    {
      label: 'Precio regular'
    },

    {
      label: 'Precio de oferta'
    },

    {
      label: 'Estatus'
    },

    {
      label: 'Canal de venta'
    }
  ];

  formTable!: FormGroup;

  formBuilder = inject(FormBuilder);
  validatorService = inject(ValidatorsService)

  createProductForm() {
    this.formTable = this.formBuilder.group({
      rows: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
     this.createProductForm();
     this.loadData()
  }

  isValidField(field: string) {
   return this.formTable.get(field)?.invalid && this.formTable.get(field)?.touched;
  }

  isValidCell(row: number, field: string) {
    const control = this.formArr.at(row).get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
    // return this.formTable.get(field)?.invalid && this.formTable.get(field)?.touched;
   }

  handlerSelection(row: number, col: number) {
    this.selectedCell = { row, col}
  }

  isSelectedCell(row: number, col: number): boolean {
    return this.selectedCell.row === row && this.selectedCell.col === col
  }

  handlerClickedSelection(row: number, col: number) {
    this.clickedCell = { row, col }
  }

  isClickedCell(row: number, col: number): boolean {
    return this.clickedCell.row === row && this.clickedCell.col === col
  }

  get formArr() {
    return this.formTable.get('rows') as FormArray;
  }

 
  updateData() {
    console.log(this.formArr)
  }

  loadData() {

    this.data.forEach( (row) => {
      this.formArr.push(this.addRow(row))
    })
   
  }

  addRow(obj: ProductInventory) {

    return this.formBuilder.group({
      img: [obj.imageProduct ? obj.imageProduct.url : '', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      title: [obj.title, [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      description: [obj.description, [Validators.required, Validators.minLength(3), Validators.maxLength(2000)]],
      sku: [obj.sku, [Validators.required, Validators.minLength(3)]],
      store: [obj.store, [Validators.required]],
      regular_price: [obj.regular_price, [Validators.required]],
      sale_price: [obj.sale_price, [Validators.required]],
      units: [obj.units],
      status: [obj.status],
      
    })
  }


}

interface HeaderTable {
  label: string;
}


/* 


*/