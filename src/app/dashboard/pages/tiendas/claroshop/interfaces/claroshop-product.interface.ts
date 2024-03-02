export interface ProductResponse {
    estatus:        string;
    mensaje:        string;
    producto:       Producto;
    versionConfig:  string;
    versionAPP:     string;
    tagManagerID:   string;
    tagManagerIDCS: string;
    visibleMenuCV:  boolean;
}

export interface Producto {
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
    categorias:               Categorias;
    filtro:                   any[];
    fotos:                    Foto[];
    atributos:                null;
    fulfillment:              boolean;
    garantia:                 string;
}

export interface Categorias {
    idcategoria: number;
    categoria:   string;
}

export interface Foto {
    idfoto:  number;
    url:     string;
    orden:   number;
    estatus: string;
}