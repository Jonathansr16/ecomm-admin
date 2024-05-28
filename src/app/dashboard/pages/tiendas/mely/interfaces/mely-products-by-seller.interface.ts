export interface MelyProductsBySeller {
    site_id:                   SiteID;
    seller:                    ProductsBySellerSeller;
    country_default_time_zone: string;
    paging:                    Paging;
    results:                   Result[];
    sort:                      Sort;
    available_sorts:           Sort[];
    filters:                   any[];
    available_filters:         AvailableFilter[];
    pdp_tracking:              PDPTracking;
}

export interface AvailableFilter {
    id:     string;
    name:   string;
    type:   string;
    values: AvailableFilterValue[];
}

export interface AvailableFilterValue {
    id:      string;
    name:    string;
    results: number;
}

export interface Sort {
    id:   string;
    name: string;
}

export interface Paging {
    total:           number;
    primary_results: number;
    offset:          number;
    limit:           number;
}

export interface PDPTracking {
    group:        boolean;
    product_info: ProductInfo[];
}

export interface ProductInfo {
    id:     string;
    score:  number;
    status: Status;
}

export enum Status {
    Shown = "shown",
}

export interface Result {
    id:                    string;
    title:                 string;
    condition:             Condition;
    thumbnail_id:          string;
    catalog_product_id:    null | string;
    listing_type_id:       ListingTypeID;
    permalink:             string;
    buying_mode:           BuyingMode;
    site_id:               SiteID;
    category_id:           string;
    domain_id:             string;
    thumbnail:             string;
    currency_id:           CurrencyID;
    order_backend:         number;
    price:                 number;
    original_price:        number | null;
    sale_price:            null;
    available_quantity:    number;
    official_store_id:     null;
    use_thumbnail_id:      boolean;
    accepts_mercadopago:   boolean;
    shipping:              Shipping;
    stop_time:             Date;
    seller:                ResultSeller;
    attributes:            ResultAttribute[];
    installments:          Installments;
    winner_item_id:        null;
    catalog_listing:       boolean;
    discounts:             null;
    promotions:            any[];
    differential_pricing?: DifferentialPricing;
    inventory_id:          null | string;
    variation_filters?:    string[];
    variations_data?:      { [key: string]: VariationsDatum };
}

export interface ResultAttribute {
    id:                   string;
    name:                 string;
    value_id:             null | string;
    value_name:           null | string;
    attribute_group_id:   AttributeGroupID;
    attribute_group_name: AttributeGroupName;
    value_struct:         Struct | null;
    values:               AttributeValue[];
    source:               number;
    value_type:           ValueType;
}

export enum AttributeGroupID {
    Others = "OTHERS",
}

export enum AttributeGroupName {
    Otros = "Otros",
}

export interface Struct {
    number: number;
    unit:   Unit;
}

export enum Unit {
    CM = "cm",
    G = "g",
    M = "m",
}

export enum ValueType {
    Boolean = "boolean",
    List = "list",
    Number = "number",
    NumberUnit = "number_unit",
    String = "string",
}

export interface AttributeValue {
    id:     null | string;
    name:   null | string;
    struct: Struct | null;
    source: number;
}

export enum BuyingMode {
    BuyItNow = "buy_it_now",
}

export enum Condition {
    New = "new",
}

export enum CurrencyID {
    Mxn = "MXN",
}

export interface DifferentialPricing {
    id: number;
}

export interface Installments {
    quantity:    number;
    amount:      number;
    rate:        number;
    currency_id: CurrencyID;
}

export enum ListingTypeID {
    GoldPro = "gold_pro",
    GoldSpecial = "gold_special",
}

export interface ResultSeller {
    id:       number;
    nickname: Nickname;
}

export enum Nickname {
    ServitaeMX = "SERVITAE MX",
}

export interface Shipping {
    store_pick_up: boolean;
    free_shipping: boolean;
    logistic_type: LogisticType;
    mode:          Mode;
    tags:          Tag[];
    benefits:      null;
    promise:       null;
}

export enum LogisticType {
    Fulfillment = "fulfillment",
    XdDropOff = "xd_drop_off",
}

export enum Mode {
    Me2 = "me2",
}

export enum Tag {
    Fulfillment = "fulfillment",
    MandatoryFreeShipping = "mandatory_free_shipping",
}

export enum SiteID {
    Mlm = "MLM",
}

export interface VariationsDatum {
    thumbnail:     string;
    ratio:         string;
    name:          string;
    pictures_qty:  number;
    price:         number;
    inventory_id?: string;
    attributes:    VariationsDatumAttribute[];
}

export interface VariationsDatumAttribute {
    id:         ID;
    name:       Name;
    value_name: null | string;
    value_type: ValueType;
}

export enum ID {
    Gtin = "GTIN",
}

export enum Name {
    CódigoUniversalDeProducto = "Código universal de producto",
}

export interface ProductsBySellerSeller {
    id:                number;
    nickname:          Nickname;
    registration_date: Date;
    tags:              string[];
    permalink:         string;
    seller_reputation: SellerReputation;
    eshop:             Eshop;
}

export interface Eshop {
    eshop_id:         number;
    seller:           number;
    nick_name:        string;
    eshop_status_id:  number;
    site_id:          SiteID;
    eshop_experience: number;
    eshop_rubro:      null;
    eshop_locations:  any[];
    eshop_logo_url:   string;
}

export interface SellerReputation {
    level_id:            string;
    power_seller_status: string;
    transactions:        Transactions;
    metrics:             Metrics;
}

export interface Metrics {
    sales:                 Sales;
    claims:                Cancellations;
    delayed_handling_time: Cancellations;
    cancellations:         Cancellations;
}

export interface Cancellations {
    period: string;
    rate:   number;
    value:  number;
}

export interface Sales {
    period:    string;
    completed: number;
}

export interface Transactions {
    canceled:  number;
    completed: number;
    period:    string;
    ratings:   Ratings;
    total:     number;
}

export interface Ratings {
    negative: number;
    neutral:  number;
    positive: number;
}
