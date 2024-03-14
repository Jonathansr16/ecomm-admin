import { ProductResponse } from "./claroshop-products.interface";

export interface ProductSearchResponse {
    estatus:        string;
    mensaje:        string;
    producto:       ProductSearch;
    versionConfig:  string;
    versionAPP:     string;
    tagManagerID:   string;
    tagManagerIDCS: string;
    visibleMenuCV:  boolean;
}

export interface ProductSearch {
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


export interface ProductSearchResult {
    estatus:        string;
    mensaje:        string;
    productos:       ProductResponse[]
    versionConfig:  string;
    versionAPP:     string;
    tagManagerID:   string;
    tagManagerIDCS: string;
    visibleMenuCV:  boolean;
}