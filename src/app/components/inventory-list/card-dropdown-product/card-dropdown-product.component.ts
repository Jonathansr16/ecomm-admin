import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ProductInventory } from 'src/app/core/interface/product.interface';
import { StatusData } from 'src/app/core/interface/status-data.interface';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SkeletonModule } from 'primeng/skeleton';
import { VariantProduct } from 'src/app/core/interface/variant-product.interface';
import { FormsModule } from '@angular/forms';
import { StateVariation } from 'src/app/core/interface/state-variations.interface';

@Component({
  selector: 'app-card-dropdown-product',
  standalone: true,
  imports: [
    CommonModule,
    SkeletonModule,
    InputSwitchModule,
    ButtonModule,
    FormsModule
  ],
  templateUrl: './card-dropdown-product.component.html',
  styleUrl: './card-dropdown-product.component.scss',
})
export class CardDropdownProductComponent {

  variationData = input.required<StateVariation>();

 }
