
export interface dataStat {

  label: string;
  value: number;
  status: 'loading' | 'success' | 'empty' | 'error';
  icon?: string;
  urlImage?: string;
  backgroundIconClass?: string; 
  iconClass?: {
    [klass: string]: any;
  }
  style?: {
    [klass: string]: any;
} | null | undefined;

command?(event?: Event): void;


 }