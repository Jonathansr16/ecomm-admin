
export interface ShipmentOrders {
    totalautomaticos:        string;
    totalpaginasautomaticas: number;
    listaguiasautomaticas:   Listaguiasautomatica[];
    listaguiasmanuales:      any[];
    totalmanuales:           number;
    totalpaginasmanuales:    number;
    totalembarcados:         number;
    versionConfig:           string;
    versionAPP:              string;
    tagManagerID:            string;
    tagManagerIDCS:          string;
    visibleMenuCV:           boolean;
}

export interface Listaguiasautomatica {
    nopedido:          string;
    estatus:           string;
    fechacolocacion:   string;
    fechaautorizacion: string;
    sku:               string;
    articulo:          string;
    fechaembarque:     string;
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
