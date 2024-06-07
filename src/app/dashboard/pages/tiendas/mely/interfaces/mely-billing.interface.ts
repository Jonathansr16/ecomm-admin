export interface MelyBilling {
    site_id: string;
    buyer:   Buyer;
    seller:  Seller;
}

export interface Buyer {
    cust_id:      string;
    billing_info: BillingInfo;
}

export interface BillingInfo {
    name:           string;
    last_name:      string;
    identification: Identification;
    taxes:          Taxes;
    address:        Address;
    attributes:     Attributes;
}

export interface Address {
    street_name:   string;
    street_number: string;
    city_name:     string;
    state:         State;
    zip_code:      string;
    country_id:    string;
}

export interface State {
    code: string;
    name: string;
}

export interface Attributes {
    vat_discriminated_billing: string;
    normalized:                string;
    cust_type:                 string;
}

export interface Identification {
    type:   string;
    number: string;
}

export interface Taxes {
    contributor:   string;
    taxpayer_type: Cfdi;
    cfdi:          Cfdi;
}

export interface Cfdi {
    id:          string;
    description: string;
}

export interface Seller {
    cust_id: string;
}
