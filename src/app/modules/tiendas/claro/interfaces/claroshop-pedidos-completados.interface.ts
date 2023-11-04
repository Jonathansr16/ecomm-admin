export interface ClaroshopCompleteOrders {
    totalpaginas:    number;
    totalentregados: number;
    totalregistros:  string;
    listaentregados: ListaEntregadoResponse[];
    versionConfig:   string;
    versionAPP:      string;
    tagManagerID:    string;
    tagManagerIDCS:  string;
    visibleMenuCV:   boolean;
}

export interface ListaEntregadoResponse {
    nopedido:          string;
    estatus:           Estatus;
    fechacolocacion:   Date;
    fechaautorizacion: Date;
    sku:               Sku;
    articulo:          string;
    fechaembarque:     Date;
    mensajeria:        Mensajeria;
    noguia:            string;
    estatusguia:       Estatus;
    claroid:           string;
    idpedidorelacion:  string;
    totalproducto:     string;
    totalpedido:       string;
    skuhijo:           string;
    fulfillment:       boolean;
    channel:           Channel;
    transactionid:     number;
}

export enum Channel {
    CS = "CS",
}

export enum Estatus {
    Entregado = "Entregado",
}

export enum Mensajeria {
    Fedex = "Fedex",
}

export enum Sku {
    E3Aq6AW0Eo = "E3-AQ6A-W0EO",
    The084193990904 = "084193990904",
}