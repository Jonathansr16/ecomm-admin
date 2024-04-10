export interface OrderResponse {
    totalpaginas:    number;
    totalentregados: number;
    totalregistros:  string;
    listaOrden: OrderListResponse[];
    versionConfig:   string;
    versionAPP:      string;
    tagManagerID:    string;
    tagManagerIDCS:  string;
    visibleMenuCV:   boolean;   
}

export interface OrderListResponse {
    nopedido:          string;
    estatus:          string;
    fechacolocacion:   Date;
    fechaautorizacion: Date;
    sku:               string;
    articulo:          string;
    fechaembarque:     Date;
    mensajeria:        string;
    noguia:            string;
    estatusguia:       string;
    claroid:           string;
    idpedidorelacion:  string;
    totalproducto:     string;
    totalpedido:       string;
    skuhijo:           string;
    fulfillment:       boolean;
    channel:           string;
    transactionid:     number;
}

// export interface OrderStatusResponse {
//     estatus: 'pendiente' | 'entregado' | 'embarcado';
// }

