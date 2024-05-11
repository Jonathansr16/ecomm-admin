export interface ClaroshopOrderByID {
    estatuspedido:  ClaroshopEstatuspedido;
    datosenvio:     ClaroshopDatosenvio;
    comentarios:    any[];
    productos:      ClaroshopProducto[];
    versionConfig:  string;
    versionAPP:     string;
    tagManagerID:   string;
    tagManagerIDCS: string;
    visibleMenuCV:  boolean;
}

export interface ClaroshopDatosenvio {
    entregara:       string;
    direccion:       string;
    entrecalles:     string;
    colonia:         string;
    "del/municipio": string;
    cp:              string;
    ciudad:          string;
    estado:          string;
    observaciones:   string;
}

export interface ClaroshopEstatuspedido {
    estatus:       string;
    fechacolocado: Date;
}

export interface ClaroshopProducto {
    idchannel:        string;
    fechaasignacion:  Date;
    fechaenvio:       Date;
    producto:         string;
    importe:          string;
    envio:            string;
    estatus:          string;
    asignado:         string;
    guia:             string;
    claroid:          string;
    idpedidorelacion: string;
    skuhijo:          string;
    sku:              string;
    skufullfilment:   boolean;
    transactionid:    number;
}
