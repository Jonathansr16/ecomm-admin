
export interface WooOrderResult {
id: number;
first_name: string;
last_name: string;
status: string;
date_created: Date;
date_modified: Date;
total: number;
product: any[];
}

export interface WooOrders {
  id: number;
  parent_id: number;
  status: string;
  currency: string;
  version: string;
  prices_include_tax: boolean;
  date_created: Date;
  date_modified: Date;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  total: string;
  total_tax: string;
  customer_id: number;
  order_key: string;
  billing: WooOrderBilling;
  shipping: WooOrderBilling;
  payment_method: string;
  payment_method_title: string;
  transaction_id: string;
  customer_ip_address: string;
  customer_user_agent: string;
  created_via: string;
  customer_note: string;
  date_completed: Date;
  date_paid: Date;
  cart_hash: string;
  number: string;
  meta_data: WooOrderMetaData[];
  line_items: WooOrderLineItem[];
  tax_lines: any[];
  shipping_lines: WooOrderShippingLine[];
  fee_lines: any[];
  coupon_lines: any[];
  refunds: any[];
  payment_url: string;
  is_editable: boolean;
  needs_payment: boolean;
  needs_processing: boolean;
  date_created_gmt: Date;
  date_modified_gmt: Date;
  date_completed_gmt: Date;
  date_paid_gmt: Date;
  currency_symbol: string;
  _links: WooOrderLinks;
}

export interface WooOrderBilling{
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
}

export interface WooOrderLineItem {
  id: number;
  name: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  tax_class: string;
  subtotal: string;
  subtotal_tax: string;
  total: string;
  total_tax: string;
  taxes: WooOrderTax[];
  meta_data: WooOrderMetaData[];
  sku: string;
  price: number;
  image: WooOrderImage;
  parent_name: null;
}

export interface WooOrderImage {
  id: string;
  src: string;
}

export interface  WooOrderLinks {
  self: WooOrderCollection[];
  collection: WooOrderCollection[];
  customer?: WooOrderCollection[];
}

export interface WooOrderCollection {
  href: string;
}

export interface WooOrderMetaData {
  id: number;
  key: string;
  value: string;
}

export interface WooOrderTax {
  id: number;
  total: string;
  subtotal: string;
}

export interface WooOrderRefund {
  id: number;
  refund: string;
  total: string;
}

export interface WooOrderShippingLine{
  id: number;
  method_title: string;
  method_id: string;
  total: string;
  total_tax: string;
  taxes: any[];
  meta_data: WooOrderMetaData[];
}

export interface WooOrderTaxLine{
  id: number;
  rate_code: string;
  rate_id: number;
  label: string;
  compound: boolean;
  tax_total: string;
  shipping_tax_total: string;
  meta_data: any[];
}

export interface WooOrderStatus {
  status: 'pending' | 'processing' | 'on-hold' | 'completed' | 'cancelled' | 'refunded' | 'failed' | 'trash'
}