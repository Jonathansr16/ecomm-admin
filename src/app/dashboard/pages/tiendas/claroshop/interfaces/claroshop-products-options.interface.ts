export interface ClaroshopProductsOption { 
    estatus:            string;
    mensaje:            string;
    productos:          ClaroshopProduct[];
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


export interface ClaroshopProduct {
    transactionid: number;
    nombre:        string;
    precio:        number;
    estatus:       string;
    ean:           string;
    claroid:       number;
    skupadre:      string;
    fulfillment:   boolean;
}

export enum claroshopEstatus {
    Activo = "activo",
    Inactivo = "inactivo",
}


