export interface ProductsResponse { 
    estatus:            string;
    mensaje:            string;
    productos:          ProductResponse[];
    totalproductos:     number;
    totalpaginas:       number;
    paginaactual:       number;
    productosporpagina: number;
    versionConfig:      string;
    versionAPP:         string;
    tagManagerID:       string;
    tagManagerIDCS:     string;
    visibleMenuCV:      boolean;
}


export interface ProductResponse {
    transactionid: number;
    nombre:        string;
    precio:        number;
    estatus:       EstatusResponse;
    ean:           string;
    claroid:       number;
    skupadre:      string;
    fulfillment:   boolean;
}

export enum EstatusResponse {
    Activo = "activo",
    Inactivo = "inactivo",
}


