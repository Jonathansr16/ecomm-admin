export interface StateTypeOrder{
    label: string;
    value: number;
    status: 'loading' | 'success' | 'empty' | 'error';
    typeOrder: 'pendiente' | 'proceso_entrega' | 'completado' | 'cancelado' | 'devolucion';
    command?(event?: Event): void;
    image: ImageTypeOrder;
    otherOrders?: OthersOrders[];
   }

   export interface ImageTypeOrder {
    id: number,
    src: string;
    alt: string;
   }

   export interface OthersOrders{
    label: string;
    value: number;
    status: 'loading' | 'success' | 'empty' | 'error';
    command?(event?: Event): void;
   }