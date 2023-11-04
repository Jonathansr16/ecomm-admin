export interface ClaroshopPendingOrders {
    totalembarcados:         number;
    totalautomaticos:        string;
    totalmanuales:           string;
    totalpaginasmanuales:    number;
    totalpaginasautomaticas: number;
    listapendientes:          ClaroshopListapendiente[];
}

export interface ClaroshopListapendiente {
    nopedido:          string;
    estatus:           string;
    fechacolocacion:   Date;
    fechaautorizacion: Date;
    sku:               string;
    articulo:          string;
    claroid:           string;
    idpedidorelacion:  string;
    sla:               string;
    comision:          string;
    totalproducto:     string;
    totalpedido:       string;
    skuhijo:           string;
}

