export interface ProductsSellerResponse {
    site_id: string
    seller: Seller
    country_default_time_zone: string
    paging: Paging
    results: ResultResponse[]
    sort: Sort
    available_sorts: AvailableSort[]
    filters: any[]
    available_filters: AvailableFilter[]
    pdp_tracking: PdpTracking
  }
  
  export interface Seller {
    id: number
    nickname: string
    registration_date: string
    tags: string[]
    permalink: string
    seller_reputation: SellerReputation
    eshop: Eshop
  }
  
  export interface SellerReputation {
    level_id: string
    power_seller_status: string
    transactions: Transactions
    metrics: Metrics
  }
  
  export interface Transactions {
    canceled: number
    completed: number
    period: string
    ratings: Ratings
    total: number
  }
  
  export interface Ratings {
    negative: number
    neutral: number
    positive: number
  }
  
  export interface Metrics {
    sales: Sales
    claims: Claims
    delayed_handling_time: DelayedHandlingTime
    cancellations: Cancellations
  }
  
  export interface Sales {
    period: string
    completed: number
  }
  
  export interface Claims {
    period: string
    rate: number
    value: number
  }
  
  export interface DelayedHandlingTime {
    period: string
    rate: number
    value: number
  }
  
  export interface Cancellations {
    period: string
    rate: number
    value: number
  }
  
  export interface Eshop {
    eshop_id: number
    seller: number
    nick_name: string
    eshop_status_id: number
    site_id: string
    eshop_experience: number
    eshop_rubro: any
    eshop_locations: any[]
    eshop_logo_url: string
  }
  
  export interface Paging {
    total: number
    primary_results: number
    offset: number
    limit: number
  }
  
  export interface ResultResponse {
    id: string
    title: string
    condition: string
    thumbnail_id: string
    catalog_product_id?: string
    listing_type_id: string
    permalink: string
    buying_mode: string
    site_id: string
    category_id: string
    domain_id: string
    thumbnail: string
    currency_id: string
    order_backend: number
    price: number
    original_price: any
    sale_price: any
    available_quantity: number
    official_store_id: any
    use_thumbnail_id: boolean
    accepts_mercadopago: boolean
    shipping: Shipping
    stop_time: string
    seller: Seller2
    attributes: Attribute[]
    installments: Installments
    winner_item_id: any
    catalog_listing: boolean
    discounts: any
    promotions: any[]
    differential_pricing?: DifferentialPricing
    inventory_id?: string
    variation_filters?: string[]
    variations_data?: any
  }
  
  export interface Shipping {
    store_pick_up: boolean
    free_shipping: boolean
    logistic_type: string
    mode: string
    tags: string[]
    benefits: any
    promise: any
  }
  
  export interface Seller2 {
    id: number
    nickname: string
  }
  
  export interface Attribute {
    id: string
    name: string
    value_id?: string
    value_name?: string
    attribute_group_id: string
    attribute_group_name: string
    value_struct?: ValueStruct
    values: Value[]
    source: number
    value_type: string
  }
  
  export interface ValueStruct {
    number: number
    unit: string
  }
  
  export interface Value {
    id?: string
    name?: string
    struct?: Struct
    source: number
  }
  
  export interface Struct {
    number: number
    unit: string
  }
  
  export interface Installments {
    quantity: number
    amount: number
    rate: number
    currency_id: string
  }
  
  export interface DifferentialPricing {
    id: number
  }
  

  
  export interface N179454500105 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
  }
  
  export interface N179454500085 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
  }
  
  export interface N179454500087 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
  }
  
  export interface N179454500091 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
  }
  
  export interface N179454500095 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
  }
  
  export interface N179454500099 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
  }
  
  export interface N179454500103 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
  }
  
  export interface N178997221753 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
    inventory_id: string
  }
  
  export interface N173640243414 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
    inventory_id: string
  }
  
  export interface N182342008347 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
  }
  
  export interface N181824819097 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
  }
  
  export interface N181824819095 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
  }
  
  export interface N182342395989 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
  }
  
  export interface N182233941435 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
  }
  
  export interface N182233941437 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
  }
  
  export interface N174147441600 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
    inventory_id: string
  }
  
  export interface N176199217149 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
    inventory_id: string
  }
  
  export interface N178310454668 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
  }
  
  export interface N173590964965 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
    inventory_id: string
  }
  
  export interface N173588069538 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
    inventory_id: string
  }
  
  export interface N179245932055 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
  }
  
  export interface N173940619057 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
    inventory_id: string
  }
  
  export interface N182236029885 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
  }
  
  export interface N180106747593 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
  }
  
  export interface N180170301321 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
  }
  
  export interface N181571288249 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
  }
  
  export interface N182342175069 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
  }
  
  export interface N180172582297 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
  }
  
  export interface N181543961455 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
  }
  
  export interface N181543285707 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
  }
  
  export interface N178989612265 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
  }
  
  export interface N181543961453 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
  }
  
  export interface N181571288247 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
  }
  
  export interface N178989612267 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
  }
  
  export interface N178989612263 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
  }
  
  export interface N181543376423 {
    thumbnail: string
    ratio: string
    name: string
    pictures_qty: number
    price: number
  }
  
  export interface Sort {
    id: string
    name: string
  }
  
  export interface AvailableSort {
    id: string
    name: string
  }
  
  export interface AvailableFilter {
    id: string
    name: string
    type: string
    values: Value2[]
  }
  
  export interface Value2 {
    id: string
    name: string
    results: number
  }
  
  export interface PdpTracking {
    group: boolean
    product_info: ProductInfo[]
  }
  
  export interface ProductInfo {
    id: string
    score: number
    status: string
  }
  