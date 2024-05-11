import { ClaroshopProduct } from "./claroshop-products-options.interface";

export interface ClaroshopProductSearch {
    estatus:        string;
    mensaje:        string;
    producto:       ClaroshopProductSearch;
    versionConfig:  string;
    versionAPP:     string;
    tagManagerID:   string;
    tagManagerIDCS: string;
    visibleMenuCV:  boolean;
}

export interface ClaroshopProductSearch {
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
    categorias:               ClaroshopCategorias;
    filtro:                   any[];
    fotos:                    ClaroshopFoto[];
    atributos:                null;
    fulfillment:              boolean;
    garantia:                 string;
}

export interface ClaroshopCategorias {
    idcategoria: number;
    categoria:   string;
}

export interface ClaroshopFoto {
    idfoto:  number;
    url:     string;
    orden:   number;
    estatus: string;
}


export interface ClaroshopProductSearchResult {
    estatus:        string;
    mensaje:        string;
    productos:       ClaroshopProduct[]
    versionConfig:  string;
    versionAPP:     string;
    tagManagerID:   string;
    tagManagerIDCS: string;
    visibleMenuCV:  boolean;
}