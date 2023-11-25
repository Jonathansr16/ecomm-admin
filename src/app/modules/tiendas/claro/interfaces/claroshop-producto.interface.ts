export interface ProductOptionsResponse {
    estatus:        string;
    mensaje:        string;
    producto:       ProductoResponse;
    versionConfig:  string;
    versionAPP:     string;
    tagManagerID:   string;
    tagManagerIDCS: string;
    visibleMenuCV:  boolean;
}

export interface ProductoResponse {
    transactionid:            number;
    nombre:                   string;
    descripcion:              string;
    especificacionestecnicas: null;
    preciopublicobase:        number;
    preciopublicooferta:      number;
    estatus:                  string;
    skupadre:                 string;
    marca:                    string;
    cantidad:                 number;
    alto:                     string;
    ancho:                    string;
    profundidad:              string;
    peso:                     number;
    ean:                      string;
    embarque:                 number;
    videos:                   string;
    tienda:                   string;
    tag:                      string;
    categorias:               ProductCategoriasResponse;
    filtro:                   any[];
    fotos:                    ProductFotoResponse[];
    atributos:                null;
    fulfillment:              boolean;
    garantia:                 null;
}

export interface ProductCategoriasResponse {
    idcategoria: number;
    categoria:   string;
}

export interface ProductFotoResponse {
    idfoto:  number;
    url:     string;
    orden:   number;
    estatus: string;
}



export interface ProductResult {
    transactionid:            number;
    nombre:                   string;
    description:              string;
    especificacionestecnicas: string;
    alto:                     number;
    ancho:                    number;
    profundidad:              number;
    preciopublicobase:        number;
    preciopublicooferta:      number;
    cantidad:                 number;
    skupadre:                 string;
    ean:                      string;
    estatus:                 'Activo' | 'Inactivo';
    embarque:                 number;
    categoria:                string;
    fotos:                    ProductFotosResul[];
    marca:                    string;
    tag:                      string;
    categorias:               ProductCategoriasResponse;
    atributos?:               string;

}


export interface ProductFotosResul {
    url:     string;
    orden:   number;
}