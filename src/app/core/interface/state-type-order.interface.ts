export interface StateTypeOrder {
    pendingOrders:   StateStatusOrder;
    shippedOrders?:   StateStatusOrder;
    completedOrders: StateStatusOrder;
    unsoldOrders?:    StateStatusOrder;
    returnOrders?:    StateStatusOrder;
  }
  
  interface StateStatusOrder {
    status: 'loading' | 'success' | 'empty' | 'error';
    quantity: number;
  }
  