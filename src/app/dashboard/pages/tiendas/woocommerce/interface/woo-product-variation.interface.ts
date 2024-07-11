import { FileItem } from "src/app/core/models/file-item.models";

export interface WooProductVar {
    id: number,
    sku: string;
    description: string;
    regular_price: string;
    sale_price: string;
    status:  'draft' | 'pending' | 'private' | 'publish';
    stock_status:  'instock' | 'outofstock' | 'onbackorder';
    images: FileItem[];
    stock_quantity: number,
    attributes: WooProductAttr[]
}

export interface WooProductAttr {
    id: number;
    attribute: string;
    value: string;
}

export interface WooProductVariation {
    id:                    number;
    type:                  Type;
    date_created:          Date;
    date_created_gmt:      Date;
    date_modified:         Date;
    date_modified_gmt:     Date;
    description:           string;
    permalink:             string;
    sku:                   string;
    price:                 string;
    regular_price:         string;
    sale_price:            string;
    date_on_sale_from:     null;
    date_on_sale_from_gmt: null;
    date_on_sale_to:       null;
    date_on_sale_to_gmt:   null;
    on_sale:               boolean;
    status:                'draft' | 'pending' | 'private' | 'publish';
    purchasable:           boolean;
    virtual:               boolean;
    downloadable:          boolean;
    downloads:             any[];
    download_limit:        number;
    download_expiry:       number;
    tax_status:            TaxStatus;
    tax_class:             string;
    manage_stock:          boolean;
    stock_quantity:        number | null;
    stock_status:          'instock' | 'outofstock' | 'onbackorder';
    backorders:            Backorders;
    backorders_allowed:    boolean;
    backordered:           boolean;
    low_stock_amount:      null;
    weight:                string;
    dimensions:            Dimensions;
    shipping_class:        string;
    shipping_class_id:     number;
    image:                 Image;
    attributes:            Attribute[];
    menu_order:            number;
    meta_data:             MetaDatum[];
    name:                  string;
    parent_id:             number;
    _links:                Links;
}

export interface Links {
    self:       Collection[];
    collection: Collection[];
    up:         Collection[];
}

export interface Collection {
    href: string;
}

export interface Attribute {
    id:     number;
    name:   Name;
    slug:   Slug;
    option: string;
}

export enum Name {
    Modelos = "Modelos",
}

export enum Slug {
    PaModelos = "pa_modelos",
}

export enum Backorders {
    No = "no",
}

export interface Dimensions {
    length: string;
    width:  string;
    height: string;
}

export interface Image {
    id:                number;
    date_created:      Date;
    date_created_gmt:  Date;
    date_modified:     Date;
    date_modified_gmt: Date;
    src:               string;
    name:              string;
    alt:               string;
}

export interface MetaDatum {
    id:    number;
    key:   Key;
    value: Value;
}

export enum Key {
    BlocksyPostMetaOptions = "blocksy_post_meta_options",
}

export interface Value {
    gallery_source: GallerySource;
    images:         any[];
}

export enum GallerySource {
    Default = "default",
}

export interface Status {
    
}

export enum TaxStatus {
    None = "none",
}

export enum Type {
    Variation = "variation",
}

