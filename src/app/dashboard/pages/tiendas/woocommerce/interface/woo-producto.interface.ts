import { StockStatus } from './woo-product-variation.interface';
export interface WooProductResult {
  id: number;
  name: string;
  description: string;
  short_description: string;
  sku: string;
  regular_price: number;
  price: number;
  categories: WooProductCategory[];
  images: WooProductImage[];
  stock_quantity: number;
  total_sales: number;
  status: 'draft' | 'pending' | 'private' | 'publish';
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
}

export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: Date;
  date_created_gmt: Date;
  date_modified: Date;
  date_modified_gmt: Date;
  type: string;
  status: 'draft' | 'pending' | 'private' | 'publish';
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_on_sale_from: null;
  date_on_sale_from_gmt: null;
  date_on_sale_to: null;
  date_on_sale_to_gmt: null;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  downloads: any[];
  download_limit: number;
  download_expiry: number;
  external_url: string;
  button_text: string;
  tax_status: string;
  tax_class: string;
  manage_stock: boolean;
  stock_quantity: number;
  backorders: string;
  backorders_allowed: boolean;
  backordered: boolean;
  low_stock_amount: null;
  sold_individually: boolean;
  weight: string;
  dimensions: WooProductDimensions;
  shipping_required: boolean;
  shipping_taxable: boolean;
  shipping_class: string;
  shipping_class_id: number;
  reviews_allowed: boolean;
  average_rating: string;
  rating_count: number;
  upsell_ids: any[];
  cross_sell_ids: any[];
  parent_id: number;
  purchase_note: string;
  categories: WooProductCategory[];
  tags: any[];
  images: WooProductImage[];
  attributes: any[];
  default_attributes: any[];
  variations: any[];
  grouped_products: any[];
  menu_order: number;
  price_html: string;
  related_ids: number[];
  meta_data: WooProductMetaData[];
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  has_options: boolean;
  post_password: string;
  yoast_head: string;
  yoast_head_json: WooProductYoastHeadJSON;
  jetpack_likes_enabled: boolean;
  jetpack_sharing_enabled: boolean;
  _links: WooProductLinks;
}

export interface WooProductImage {
  id: number;
  date_created: Date;
  date_created_gmt: Date;
  date_modified: Date;
  date_modified_gmt: Date;
  src: string;
  name: string;
  alt: string;
}


export interface WooProductLinks {
  self: WooProductCollection[];
  collection: WooProductCollection[];
}

export interface WooProductCollection {
  href: string;
}

export interface WooProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface WooProductDimensions {
  length: string;
  width: string;
  height: string;
}

export interface WooProductMetaData {
  id: number;
  key: string;
  value: WooProductValueClass | string;
}

export interface WooProductValueClass {
  bg_full: string;
  display_header: string;
  header_bg_full: string;
  main_padding: WooProductMainPadding;
  content_bg_full: string;
  bg_repeat: string;
  header_bg_repeat: string;
  displayed_menu: string;
  slider_type: string;
  wooslider: string;
  page_title_bar: string;
  content_bg_repeat: string;
  woo_sidebar: string;
  woo_sidebar_2: string;
  sidebar_sticky: string;
}

export interface WooProductMainPadding{
  top: string;
  bottom: string;
}

export interface WooProductYoastHeadJSON {
  title: string;
  description: string;
  robots: WooProductRobots;
  canonical: string;
  og_locale: string;
  og_type: string;
  og_title: string;
  og_description: string;
  og_url: string;
  og_site_name: string;
  article_publisher: string;
  article_modified_time: Date;
  og_image: WooProductOgImage[];
  twitter_card: string;
  twitter_misc: WooTwitterMisc;
  schema: WooProductSchema;
}

export interface WooProductOgImage {
  width: number;
  height: number;
  url: string;
  type: string;
}

export interface WooProductRobots {
  index: string;
  follow: string;
  'max-snippet': string;
  'max-image-preview': string;
  'max-video-preview': string;
}

export interface WooProductSchema {
  '@context': string;
  '@graph': WooProductGraph[];
}

export interface WooProductGraph {
  '@type': string;
  '@id': string;
  url?: string;
  name?: string;
  isPartOf?: WooBreadcrumb;
  datePublished?: Date;
  dateModified?: Date;
  description?: string;
  breadcrumb?: WooBreadcrumb;
  inLanguage?: string;
  potentialAction?: WooPotentialAction[];
  itemListElement?: WooItemListElement[];
  publisher?: WooBreadcrumb;
  logo?: WooLogo;
  image?: WooBreadcrumb;
  sameAs?: string[];
}

export interface WooBreadcrumb {
  '@id': string;
}

export interface WooItemListElement {
  '@type': string;
  position: number;
  name: string;
  item?: string;
}

export interface WooLogo {
  '@type': string;
  inLanguage: string;
  '@id': string;
  url: string;
  contentUrl: string;
  width: number;
  height: number;
  caption: string;
}

export interface WooPotentialAction {
  '@type': string;
  target: string[] | WooTargetClass;
  'query-input'?: string;
}

export interface WooTargetClass {
  '@type': string;
  urlTemplate: string;
}

export interface WooTwitterMisc {
  'Tiempo de lectura': string;
}
