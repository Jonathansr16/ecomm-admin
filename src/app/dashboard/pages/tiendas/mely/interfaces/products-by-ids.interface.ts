export interface ProductsByIdsResponse {
    code: number;
    body: BodyProductResponse;
}

export interface BodyProductResponse {
    id:                               string;
    site_id:                          string;
    title:                            string;
    seller_id:                        number;
    category_id:                      string;
    user_product_id:                  null;
    official_store_id:                null;
    price:                            number;
    base_price:                       number;
    original_price:                   null;
    inventory_id:                     null;
    currency_id:                      string;
    initial_quantity:                 number;
    available_quantity:               number;
    sold_quantity:                    number;
    sale_terms:                       SaleTerm[];
    buying_mode:                      string;
    listing_type_id:                  string;
    start_time:                       Date;
    stop_time:                        Date;
    end_time:                         Date;
    expiration_time:                  Date;
    condition:                        string;
    permalink:                        string;
    thumbnail_id:                     string;
    thumbnail:                        string;
    pictures:                         Picture[];
    video_id:                         null;
    descriptions:                     any[];
    accepts_mercadopago:              boolean;
    non_mercado_pago_payment_methods: any[];
    shipping:                         Shipping;
    international_delivery_mode:      string;
    seller_address:                   SellerAddress;
    seller_contact:                   null;
    location:                         Location;
    geolocation:                      Geolocation;
    coverage_areas:                   any[];
    attributes:                       Attribute[];
    warnings:                         any[];
    listing_source:                   string;
    variations:                       Variation[];
    status:                           string;
    sub_status:                       any[];
    tags:                             string[];
    warranty:                         string;
    catalog_product_id:               null | string;
    domain_id:                        string;
    seller_custom_field:              null;
    parent_item_id:                   null;
    differential_pricing:             null;
    deal_ids:                         string[];
    automatic_relist:                 boolean;
    date_created:                     Date;
    last_updated:                     Date;
    health:                           number | null;
    catalog_listing:                  boolean;
    item_relations:                   any[];
    channels:                         string[];
}

export interface Attribute {
    id:         string;
    name:       string;
    value_id:   null | string;
    value_name: null | string;
    values:     Value[];
    value_type: ValueType;
}

export enum ValueType {
    Boolean = "boolean",
    List = "list",
    NumberUnit = "number_unit",
    String = "string",
}

export interface Value {
    id:     null | string;
    name:   null | string;
    struct: Struct | null;
}

export interface Struct {
    number: number;
    unit:   string;
}

export interface Geolocation {
    latitude:  number;
    longitude: number;
}

export interface Location {
}

export interface Picture {
    id:         string;
    url:        string;
    secure_url: string;
    size:       string;
    max_size:   string;
    quality:    string;
}

export interface SaleTerm {
    id:            string;
    name:          string;
    value_id:      string;
    value_name:    string;
    value_struct?: null;
    values:        Value[];
    value_type:    ValueType;
}

export interface SellerAddress {
    comment:         string;
    address_line:    string;
    zip_code:        string;
    city:            City;
    state:           City;
    country:         City;
    search_location: SearchLocation;
    latitude:        number;
    longitude:       number;
    id:              number;
}

export interface City {
    id:   string;
    name: Name;
}

export enum Name {
    Córdoba = "Córdoba",
    Mexico = "Mexico",
    Veracruz = "Veracruz",
}

export interface SearchLocation {
    city:  City;
    state: City;
}

export interface Shipping {
    mode:          string;
    methods:       any[];
    tags:          string[];
    dimensions:    null;
    local_pick_up: boolean;
    free_shipping: boolean;
    logistic_type: string;
    store_pick_up: boolean;
}

export interface Variation {
    id:                     number;
    price:                  number;
    attribute_combinations: SaleTerm[];
    available_quantity:     number;
    sold_quantity:          number;
    sale_terms:             any[];
    picture_ids:            string[];
    seller_custom_field:    null;
    catalog_product_id:     null;
    inventory_id:           string;
    item_relations:         any[];
    user_product_id:        null;
}
