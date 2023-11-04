// To parse this data:
//
//   import { Convert, ClaroShopResponse } from "./file";
//
//   const claroShopResponse = Convert.toClaroShopResponse(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface ClaroshopOptionsResponse {
    estatus:            string;
    mensaje:            string;
    productos:          ClaroshopProductsResponse[];
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

export interface    ClaroshopProductsResponse {
    transactionid?: number;
    nombre:        string;
    precio:        number;
    estatus?:       Estatus;
    ean?:           string;
    claroid:       number;
    skupadre:      string;
    fulfillment?:   boolean;
}


export interface ClaroshopProductResponse {
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
    categorias:               CategoriasResponse;
    filtro:                   any[];
    fotos:                    FotoResponse[];
    atributos:                null;
    fulfillment:              boolean;
    garantia:                 null; 
}


export enum Estatus {
    Activo = "activo",
    Inactivo = "inactivo",
}

export interface CategoriasResponse {
    idcategoria: number;
    categoria:   string;
}

export interface FotoResponse {
    idfoto:  number;
    url:     string;
    orden:   number;
    estatus: string;
}
