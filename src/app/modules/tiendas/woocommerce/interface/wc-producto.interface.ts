// To parse this data:
//
//   import { Convert, Welcome } from "./file";
//
//   const welcome = Convert.toWelcome(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface WcProductoResponse {
    id:                    number;
    name:                  string;
    status?:                string;
    description:           string;
    short_description:     string;
    sku:                   string;
    price?:                 string;
    regular_price:         string;
    sale_price:            string;
    total_sales:           number;
    categories:            CategoryResponse[];
    tags?:                  any[];
    images:                FormData;
    stock_quantity:        null;
    stock_status?:          string;

}

export interface Links {
    self:       Collection[];
    collection: Collection[];
}

export interface Collection {
    href: string;
}

export interface CategoryResponse {
    id:   number;
    name: string;
    slug: string;
}

export interface Dimensions {
    length: string;
    width:  string;
    height: string;
}

export interface ImageResponse {
    id:                number;
    date_created:      Date;
    date_created_gmt:  Date;
    date_modified:     Date;
    date_modified_gmt: Date;
    src:               string;
    name:              string;
    alt:               string;
}


