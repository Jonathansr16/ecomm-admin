import { VariantProduct } from './variant-product.interface';

export interface StateVariation {
  status: 'loading' | 'success' | 'empty' | 'error';
  data: VariantProduct[];
}
