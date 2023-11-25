export interface ProductsOptionsResonse {
    estatus:            string;
    mensaje:            string;
    productos:          ProductsResponse[];
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

export interface ProductsResponse {
    transactionid: number;
    nombre:        string;
    precio:        number;
    estatus:       string;
    ean:           string;
    claroid:       number;
    skupadre:      string;
    fulfillment:   boolean;
}


export interface ProductsResul {
    productos: ProductsResponse[];
    totalproductos:     number;
    totalpaginas:       number;
    paginaactual:       number;
    productosporpagina: number;
}