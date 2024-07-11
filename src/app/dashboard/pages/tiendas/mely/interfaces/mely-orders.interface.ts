export interface MelyOrders {
    query:           string;
    results:         MelyResult[];
    sort:            MelySort;
    available_sorts: MelySort[];
    filters:         any[];
    paging:          MelyPaging;
    display:         string;
}

export interface MelySort {
    id:   string;
    name: string;
}

export interface MelyPaging {
    total:  number;
    offset: number;
    limit:  number;
}

export interface MelyResult {
    payments:                  MelyPayment[];
    fulfilled:                 null;
    taxes:                     MelyTaxes;
    order_request:             MelyOrderRequest;
    expiration_date:           Date;
    feedback:                  MelyFeedback;
    shipping:                  MelyShipping;
    date_closed:               Date;
    id:                        number;
    manufacturing_ending_date: null;
    order_items:               MelyOrderItem[];
    date_last_updated:         Date;
    last_updated:              Date;
    comment:                   null;
    pack_id:                   number | null;
    coupon:                    MelyCoupon;
    shipping_cost:             null;
    date_created:              Date;
    pickup_id:                 null;
    status_detail:             null;
    tags:                      string[];
    buyer:                     MelyBuyer;
    seller:                    MelyBuyer;
    total_amount:              number;
    paid_amount:               number;
    currency_id:               string;
    status:                    string;
    context:                   MelyContext;
}

export interface MelyBuyer {
    id:       number;
    nickname: string;
}

export interface MelyContext {
    application: null;
    product_id:  null;
    channel:     string;
    site:        string;
    flows:       string[];
}

export interface MelyCoupon {
    amount: number;
    id:     null;
}

export interface MelyFeedback {
    buyer:  null;
    seller: null;
}

export interface MelyOrderItem {
    item:               MelyItem;
    quantity:           number;
    unit_price:         number;
    full_unit_price:    number;
    currency_id:        string;
    manufacturing_days: null;
    picked_quantity:    null;
    requested_quantity: MelyRequestedQuantity;
    sale_fee:           number;
    listing_type_id:    string;
    base_exchange_rate: null;
    base_currency_id:   null;
    bundle:             null;
    element_id:         number;
}

export interface MelyItem {
    id:                   string;
    title:                string;
    category_id:          string;
    variation_id:         number;
    seller_custom_field:  null;
    global_price:         null;
    net_weight:           null;
    variation_attributes: any[];
    warranty:             string;
    condition:            string;
    seller_sku:           string;
}

export interface MelyRequestedQuantity {
    measure: string;
    value:   number;
}

export interface MelyOrderRequest {
    change: null;
    return: null;
}

export interface MelyPayment {
    reason:                      string;
    status_code:                 null;
    total_paid_amount:           number;
    operation_type:              string;
    transaction_amount:          number;
    transaction_amount_refunded: number;
    date_approved:               Date;
    collector:                   MelyShipping;
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
    atm_transfer_reference:      MelyATMTransferReference;
    site_id:                     string;
    payer_id:                    number;
    order_id:                    number;
    currency_id:                 string;
    status:                      string;
    transaction_order_id:        null;
}

export interface MelyATMTransferReference {
    transaction_id: null | string;
    company_id:     null;
}

export interface MelyShipping {
    id: number;
}

export interface MelyTaxes {
    amount:      null;
    currency_id: null;
    id:          null;
}
