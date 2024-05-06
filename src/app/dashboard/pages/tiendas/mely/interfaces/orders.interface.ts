export interface OrdersResponse {
    query:           string;
    results:         Result[];
    sort:            Sort;
    available_sorts: Sort[];
    filters:         any[];
    paging:          Paging;
    display:         string;
}

export interface Sort {
    id:   string;
    name: string;
}

export interface Paging {
    total:  number;
    offset: number;
    limit:  number;
}

export interface Result {
    payments:                  Payment[];
    fulfilled:                 null;
    taxes:                     Taxes;
    order_request:             OrderRequest;
    expiration_date:           Date;
    feedback:                  Feedback;
    shipping:                  Shipping;
    date_closed:               Date;
    id:                        number;
    manufacturing_ending_date: null;
    order_items:               OrderItem[];
    date_last_updated:         Date;
    last_updated:              Date;
    comment:                   null;
    pack_id:                   number | null;
    coupon:                    Coupon;
    shipping_cost:             null;
    date_created:              Date;
    pickup_id:                 null;
    status_detail:             null;
    tags:                      string[];
    buyer:                     Buyer;
    seller:                    Buyer;
    total_amount:              number;
    paid_amount:               number;
    currency_id:               string;
    status:                    string;
    context:                   Context;
}

export interface Buyer {
    id:       number;
    nickname: string;
}

export interface Context {
    application: null;
    product_id:  null;
    channel:     string;
    site:        string;
    flows:       string[];
}

export interface Coupon {
    amount: number;
    id:     null;
}

export interface Feedback {
    buyer:  null;
    seller: null;
}

export interface OrderItem {
    item:               Item;
    quantity:           number;
    unit_price:         number;
    full_unit_price:    number;
    currency_id:        string;
    manufacturing_days: null;
    picked_quantity:    null;
    requested_quantity: RequestedQuantity;
    sale_fee:           number;
    listing_type_id:    string;
    base_exchange_rate: null;
    base_currency_id:   null;
    bundle:             null;
    element_id:         number;
}

export interface Item {
    id:                   string;
    title:                string;
    category_id:          string;
    variation_id:         null;
    seller_custom_field:  null;
    global_price:         null;
    net_weight:           null;
    variation_attributes: any[];
    warranty:             string;
    condition:            string;
    seller_sku:           string;
}

export interface RequestedQuantity {
    measure: string;
    value:   number;
}

export interface OrderRequest {
    change: null;
    return: null;
}

export interface Payment {
    reason:                      string;
    status_code:                 null;
    total_paid_amount:           number;
    operation_type:              string;
    transaction_amount:          number;
    transaction_amount_refunded: number;
    date_approved:               Date;
    collector:                   Shipping;
    coupon_id:                   null;
    installments:                number;
    authorization_code:          null;
    taxes_amount:                number;
    id:                          number;
    date_last_modified:          Date;
    coupon_amount:               number;
    available_actions:           string[];
    shipping_cost:               number;
    installment_amount:          null;
    date_created:                Date;
    activation_uri:              null;
    overpaid_amount:             number;
    card_id:                     null;
    status_detail:               string;
    issuer_id:                   null | string;
    payment_method_id:           string;
    payment_type:                string;
    deferred_period:             null;
    atm_transfer_reference:      ATMTransferReference;
    site_id:                     string;
    payer_id:                    number;
    order_id:                    number;
    currency_id:                 string;
    status:                      string;
    transaction_order_id:        null;
}

export interface ATMTransferReference {
    transaction_id: null | string;
    company_id:     null;
}

export interface Shipping {
    id: number;
}

export interface Taxes {
    amount:      null;
    currency_id: null;
    id:          null;
}
