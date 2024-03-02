export interface OrderTable {
  id: number;
  date_created: Date;
  first_name: OrderBillingResponse;
  last_name: OrderBillingResponse;
  status: string;
  date_modified: Date;
  title: string;
  img: OrderLineItemResponse[];
  sku: OrderLineItemResponse[];
  price: number;
  quantity: number;
}

export interface OrderResult {
  id: number;
  first_name: string;
  last_name: string;
  status: string;
  date_created: Date;
  date_modified: Date;
  product: ProductOrderResult[];
  total: string;
}

export interface ProductOrderResult {
  name: string;
  quantity: number;
  total: string;
  sku: string;
  price: number;
  image: OrderImageResponse;
}

export interface OrderResponse {
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
  billing: OrderBillingResponse;
  shipping: OrderBillingResponse;
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
  meta_data: OrderMetaDatumResponse[];
  line_items: OrderLineItemResponse[];
  tax_lines: any[];
  shipping_lines: OrderShippingLineResponse[];
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
  _links: OrderLinksResponse;
}

export interface OrderBillingResponse {
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

export interface OrderLineItemResponse {
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
  taxes: OrderTaxResponse[];
  meta_data: OrderMetaDatumResponse[];
  sku: string;
  price: number;
  image: OrderImageResponse;
  parent_name: null;
}

export interface OrderImageResponse {
  id: string;
  src: string;
}

export interface OrderLinksResponse {
  self: OrderCollectionResponse[];
  collection: OrderCollectionResponse[];
  customer?: OrderCollectionResponse[];
}

export interface OrderCollectionResponse {
  href: string;
}

export interface OrderMetaDatumResponse {
  id: number;
  key: string;
  value: string;
}

export interface OrderTaxResponse {
  id: number;
  total: string;
  subtotal: string;
}

export interface OrderRefundResponse {
  id: number;
  refund: string;
  total: string;
}

export interface OrderShippingLineResponse {
  id: number;
  method_title: string;
  method_id: string;
  total: string;
  total_tax: string;
  taxes: any[];
  meta_data: OrderMetaDatumResponse[];
}

export interface OrderTaxLineResponse {
  id: number;
  rate_code: string;
  rate_id: number;
  label: string;
  compound: boolean;
  tax_total: string;
  shipping_tax_total: string;
  meta_data: any[];
}
