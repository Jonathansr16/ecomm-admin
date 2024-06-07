export interface WooProductVariation {
    id:                    number;
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
    status:                Status;
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
    stock_status:          StockStatus;
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

export enum Status {
    Publish = "publish",
}

export enum StockStatus {
    Instock = "instock",
    Outofstock = "outofstock",
}

export enum TaxStatus {
    Taxable = "taxable",
}
