export interface dataStat {

    icon?: string;
    urlImage?: string;
    label: string;
    title?: string;
    quantity: number;
    backgroundIconClass?: string;
        
    iconClass?: {
      [klass: string]: any;
    }
    style?: {
      [klass: string]: any;
  } | null | undefined;
  
   }