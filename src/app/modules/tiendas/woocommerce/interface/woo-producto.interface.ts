export interface ProductResult {
    id:                    number;
    name:                  string;
    description:           string;
    short_description:     string;
    sku:                   string;
    regular_price:         string;
    sale_price:            string;
    categories:            ProductCategoryResponse[];
    images:               any;
    stock_quantity:        number;
    stock_status: string;
    status: string;
    total_sales: number;
}


export interface ProductResponse {
    id:                      number;
    name:                    string;
    slug:                    string;
    permalink:               string;
    date_created:            Date;
    date_created_gmt:        Date;
    date_modified:           Date;
    date_modified_gmt:       Date;
    type:                    string;
    status:                  string;
    featured:                boolean;
    catalog_visibility:      string;
    description:             string;
    short_description:       string;
    sku:                     string;
    price:                   string;
    regular_price:           string;
    sale_price:              string;
    date_on_sale_from:       null;
    date_on_sale_from_gmt:   null;
    date_on_sale_to:         null;
    date_on_sale_to_gmt:     null;
    on_sale:                 boolean;
    purchasable:             boolean;
    total_sales:             number;
    virtual:                 boolean;
    downloadable:            boolean;
    downloads:               any[];
    download_limit:          number;
    download_expiry:         number;
    external_url:            string;
    button_text:             string;
    tax_status:              string;
    tax_class:               string;
    manage_stock:            boolean;
    stock_quantity:          number;
    backorders:              string;
    backorders_allowed:      boolean;
    backordered:             boolean;
    low_stock_amount:        null;
    sold_individually:       boolean;
    weight:                  string;
    dimensions:              ProductDimensionsResponse;
    shipping_required:       boolean;
    shipping_taxable:        boolean;
    shipping_class:          string;
    shipping_class_id:       number;
    reviews_allowed:         boolean;
    average_rating:          string;
    rating_count:            number;
    upsell_ids:              any[];
    cross_sell_ids:          any[];
    parent_id:               number;
    purchase_note:           string;
    categories:              ProductCategoryResponse[];
    tags:                    any[];
    images:                  ProductImageResponse[];
    attributes:              any[];
    default_attributes:      any[];
    variations:              any[];
    grouped_products:        any[];
    menu_order:              number;
    price_html:              string;
    related_ids:             number[];
    meta_data:               ProductMetaDatumResponse[];
    stock_status:            string;
    has_options:             boolean;
    post_password:           string;
    yoast_head:              string;
    yoast_head_json:         ProductYoastHeadJSONResponse;
    jetpack_likes_enabled:   boolean;
    jetpack_sharing_enabled: boolean;
    _links:                  ProductLinksResponse;
}

export interface ProductImageResponse {
    id:                number;
    date_created:      Date;
    date_created_gmt:  Date;
    date_modified:     Date;
    date_modified_gmt: Date;
    src:               string;
    name:              string;
    alt:               string;
}


export interface ProductImageResult {
    id:                number;
    src:               string;
    name:              string;
    alt:               string;
}

export interface ProductLinksResponse {
    self:       ProductCollectionResponse[];
    collection: ProductCollectionResponse[];
}

export interface ProductCollectionResponse {
    href: string;
}

export interface ProductCategoryResponse {
    id:   number;
    name: string;
    slug: string;
}

export interface ProductDimensionsResponse {
    length: string;
    width:  string;
    height: string;
}



export interface ProductMetaDatumResponse {
    id:    number;
    key:   string;
    value: ProductValueClassResponse | string;
}

export interface ProductValueClassResponse {
    bg_full:           string;
    display_header:    string;
    header_bg_full:    string;
    main_padding:      ProductMainPaddingResponse;
    content_bg_full:   string;
    bg_repeat:         string;
    header_bg_repeat:  string;
    displayed_menu:    string;
    slider_type:       string;
    wooslider:         string;
    page_title_bar:    string;
    content_bg_repeat: string;
    woo_sidebar:       string;
    woo_sidebar_2:     string;
    sidebar_sticky:    string;
}

export interface ProductMainPaddingResponse {
    top:    string;
    bottom: string;
}

export interface ProductYoastHeadJSONResponse {
    title:                 string;
    description:           string;
    robots:                ProductRobotsResponse;
    canonical:             string;
    og_locale:             string;
    og_type:               string;
    og_title:              string;
    og_description:        string;
    og_url:                string;
    og_site_name:          string;
    article_publisher:     string;
    article_modified_time: Date;
    og_image:              ProductOgImageResponse[];
    twitter_card:          string;
    twitter_misc:          TwitterMisc;
    schema:                ProductSchemaResponse;
}

export interface ProductOgImageResponse {
    width:  number;
    height: number;
    url:    string;
    type:   string;
}

export interface ProductRobotsResponse {
    index:               string;
    follow:              string;
    "max-snippet":       string;
    "max-image-preview": string;
    "max-video-preview": string;
}

export interface ProductSchemaResponse {
    "@context": string;
    "@graph":   ProductGraphResponse[];
}

export interface ProductGraphResponse {
    "@type":          string;
    "@id":            string;
    url?:             string;
    name?:            string;
    isPartOf?:        Breadcrumb;
    datePublished?:   Date;
    dateModified?:    Date;
    description?:     string;
    breadcrumb?:      Breadcrumb;
    inLanguage?:      string;
    potentialAction?: PotentialAction[];
    itemListElement?: ItemListElement[];
    publisher?:       Breadcrumb;
    logo?:            Logo;
    image?:           Breadcrumb;
    sameAs?:          string[];
}

export interface Breadcrumb {
    "@id": string;
}

export interface ItemListElement {
    "@type":  string;
    position: number;
    name:     string;
    item?:    string;
}

export interface Logo {
    "@type":    string;
    inLanguage: string;
    "@id":      string;
    url:        string;
    contentUrl: string;
    width:      number;
    height:     number;
    caption:    string;
}

export interface PotentialAction {
    "@type":        string;
    target:         string[] | TargetClass;
    "query-input"?: string;
}

export interface TargetClass {
    "@type":     string;
    urlTemplate: string;
}

export interface TwitterMisc {
    "Tiempo de lectura": string;
}