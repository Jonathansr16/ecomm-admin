export interface MelyShipping {
    substatus_history:      SubstatusHistory[];
    snapshot_packing:       null;
    receiver_id:            number;
    base_cost:              number;
    status_history:         StatusHistory;
    type:                   string;
    return_details:         null;
    sender_id:              number;
    mode:                   string;
    order_cost:             number;
    priority_class:         null;
    service_id:             number;
    shipping_items:         ShippingItem[];
    tracking_number:        string;
    cost_components:        CostComponents;
    id:                     number;
    tracking_method:        string;
    last_updated:           Date;
    items_types:            null;
    comments:               null;
    substatus:              string;
    date_created:           Date;
    date_first_printed:     Date;
    created_by:             string;
    application_id:         null;
    shipping_option:        ShippingOption;
    tags:                   any[];
    sender_address:         SenderAddress;
    sibling:                Sibling;
    return_tracking_number: null;
    site_id:                string;
    carrier_info:           null;
    market_place:           string;
    receiver_address:       ReceiverAddress;
    customer_id:            null;
    order_id:               number;
    quotation:              null;
    status:                 string;
    logistic_type:          string;
}

export interface CostComponents {
    loyal_discount:   number;
    special_discount: number;
    compensation:     number;
    gap_discount:     number;
    ratio:            number;
}

export interface ReceiverAddress {
    country:                  City;
    city:                     City;
    geolocation_type:         string;
    latitude:                 number;
    municipality:             City;
    location_id:              null;
    street_name:              string;
    zip_code:                 string;
    intersection:             null;
    receiver_name:            string;
    id:                       number;
    state:                    City;
    longitude:                number;
    address_line:             string;
    types:                    string[];
    scoring:                  null;
    agency:                   null;
    geolocation_source:       string;
    delivery_preference:      string;
    node:                     null;
    street_number:            string;
    comment:                  string;
    neighborhood:             City;
    geolocation_last_updated: Date;
    receiver_phone:           string;
}

export interface City {
    id:   null | string;
    name: null | string;
}

export interface SenderAddress {
    country:                  City;
    address_line:             string;
    types:                    string[];
    scoring:                  number;
    agency:                   null;
    city:                     City;
    geolocation_type:         string;
    latitude:                 number;
    municipality:             City;
    location_id:              null;
    street_name:              string;
    zip_code:                 string;
    geolocation_source:       string;
    node:                     null;
    intersection:             null;
    street_number:            string;
    comment:                  string;
    id:                       number;
    state:                    City;
    neighborhood:             City;
    geolocation_last_updated: Date;
    longitude:                number;
}

export interface ShippingItem {
    quantity:          number;
    dimensions_source: DimensionsSource;
    description:       string;
    id:                string;
    user_product_id:   null;
    sender_id:         number;
    dimensions:        string;
}

export interface DimensionsSource {
    origin: string;
    id:     string;
}

export interface ShippingOption {
    processing_time:             null;
    cost:                        number;
    estimated_schedule_limit:    Buffering;
    shipping_method_id:          number;
    estimated_delivery_final:    EstimatedDelivery;
    buffering:                   Buffering;
    pickup_promise:              null;
    list_cost:                   number;
    estimated_delivery_limit:    EstimatedDelivery;
    priority_class:              null;
    delivery_promise:            string;
    delivery_type:               string;
    estimated_handling_limit:    Buffering;
    estimated_delivery_time:     EstimatedDeliveryTime;
    name:                        string;
    id:                          number;
    estimated_delivery_extended: EstimatedDelivery;
    currency_id:                 string;
}

export interface Buffering {
    date: Date | null;
}

export interface EstimatedDelivery {
    date:   Date;
    offset: number;
}

export interface EstimatedDeliveryTime {
    date:       Date;
    pay_before: Date;
    schedule:   null;
    unit:       string;
    offset:     Offset;
    shipping:   number;
    time_frame: TimeFrame;
    handling:   number;
    type:       string;
}

export interface Offset {
    date:     null;
    shipping: null;
}

export interface TimeFrame {
    from: null;
    to:   null;
}

export interface Sibling {
    reason:       null;
    sibling_id:   null;
    description:  null;
    source:       null;
    date_created: null;
    last_updated: null;
}

export interface StatusHistory {
    date_shipped:       null;
    date_returned:      null;
    date_delivered:     null;
    date_first_visit:   null;
    date_not_delivered: null;
    date_cancelled:     null;
    date_handling:      Date;
    date_ready_to_ship: Date;
}

export interface SubstatusHistory {
    date:      Date;
    substatus: string;
    status:    string;
}
