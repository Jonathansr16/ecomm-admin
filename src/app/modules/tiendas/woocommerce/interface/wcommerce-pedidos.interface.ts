// To parse this data:
//
//   import { Convert } from "./file";
//
//   const wcPedidosResponse = Convert.toWcPedidosResponse(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.


export interface WcPedidosTable {
    id:           number;
    date_created: Date;
    first_name: BillingResponse;
    last_name: BillingResponse;
    status: string;
    date_modified: Date;
    title: string;
    img: LineItem[];
    sku: LineItem[];
    price: number;
    quantity: number;
   

}


export interface PedidosResponse {
    id:                   number;
    parent_id:            number;
    number:               string;
    order_key:            string;
    created_via:          string;
    version:              string;
    status:               string;
    currency:             string;
    date_created:         Date;
    date_created_gmt:     Date;
    date_modified:        Date;
    date_modified_gmt:    Date;
    discount_total:       string;
    discount_tax:         string;
    shipping_total:       string;
    shipping_tax:         string;
    cart_tax:             string;
    total:                string;
    total_tax:            string;
    prices_include_tax:   boolean;
    customer_id:          number;
    customer_ip_address:  string;
    customer_user_agent:  string;
    customer_note:        string;
    billing:              BillingResponse;
    shipping:             BillingResponse;
    payment_method:       string;
    payment_method_title: string;
    transaction_id:       string;
    date_paid:            Date | null;
    date_paid_gmt:        Date | null;
    date_completed:       Date | null;
    date_completed_gmt:   Date | null;
    cart_hash:            string;
    meta_data:            MetaDatum[];
    line_items:           LineItem[];
    tax_lines:            TaxLine[];
    shipping_lines:       ShippingLine[];
    fee_lines:            any[];
    coupon_lines:         any[];
    refunds:              Refund[];
    _links:               Links;
}

export interface Links {
    self:       Collection[];
    collection: Collection[];
    customer?:  Collection[];
}

export interface Collection {
    href: string;
}

export interface BillingResponse {
    first_name: string;
    last_name:  string;
    company:    string;
    address_1:  string;
    address_2:  string;
    city:       string;
    state:      string;
    postcode:   string;
    country:    string;
    email?:     string;
    phone?:     string;
}

export interface LineItem {
    id:           number;
    name:         string;
    product_id:   number;
    variation_id: number;
    quantity:     number;
    tax_class:    string;
    subtotal:     string;
    subtotal_tax: string;
    total:        string;
    total_tax:    string;
    taxes:        Tax[];
    meta_data:    MetaDatum[];
    sku:          string;
    price:        number;
}

export interface MetaDatum {
    id:    number;
    key:   string;
    value: string;
}

export interface Tax {
    id:       number;
    total:    string;
    subtotal: string;
}

export interface Refund {
    id:     number;
    refund: string;
    total:  string;
}

export interface ShippingLine {
    id:           number;
    method_title: string;
    method_id:    string;
    total:        string;
    total_tax:    string;
    taxes:        any[];
    meta_data:    MetaDatum[];
}

export interface TaxLine {
    id:                 number;
    rate_code:          string;
    rate_id:            number;
    label:              string;
    compound:           boolean;
    tax_total:          string;
    shipping_tax_total: string;
    meta_data:          any[];
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toWcPedidosResponse(json: string): PedidosResponse[] {
        return cast(JSON.parse(json), a(r("WcPedidosResponse")));
    }

    public static wcPedidosResponseToJson(value: PedidosResponse[]): string {
        return JSON.stringify(uncast(value, a(r("WcPedidosResponse"))), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "WcPedidosResponse": o([
        { json: "id", js: "id", typ: 0 },
        { json: "parent_id", js: "parent_id", typ: 0 },
        { json: "number", js: "number", typ: "" },
        { json: "order_key", js: "order_key", typ: "" },
        { json: "created_via", js: "created_via", typ: "" },
        { json: "version", js: "version", typ: "" },
        { json: "status", js: "status", typ: "" },
        { json: "currency", js: "currency", typ: "" },
        { json: "date_created", js: "date_created", typ: Date },
        { json: "date_created_gmt", js: "date_created_gmt", typ: Date },
        { json: "date_modified", js: "date_modified", typ: Date },
        { json: "date_modified_gmt", js: "date_modified_gmt", typ: Date },
        { json: "discount_total", js: "discount_total", typ: "" },
        { json: "discount_tax", js: "discount_tax", typ: "" },
        { json: "shipping_total", js: "shipping_total", typ: "" },
        { json: "shipping_tax", js: "shipping_tax", typ: "" },
        { json: "cart_tax", js: "cart_tax", typ: "" },
        { json: "total", js: "total", typ: "" },
        { json: "total_tax", js: "total_tax", typ: "" },
        { json: "prices_include_tax", js: "prices_include_tax", typ: true },
        { json: "customer_id", js: "customer_id", typ: 0 },
        { json: "customer_ip_address", js: "customer_ip_address", typ: "" },
        { json: "customer_user_agent", js: "customer_user_agent", typ: "" },
        { json: "customer_note", js: "customer_note", typ: "" },
        { json: "billing", js: "billing", typ: r("Ing") },
        { json: "shipping", js: "shipping", typ: r("Ing") },
        { json: "payment_method", js: "payment_method", typ: "" },
        { json: "payment_method_title", js: "payment_method_title", typ: "" },
        { json: "transaction_id", js: "transaction_id", typ: "" },
        { json: "date_paid", js: "date_paid", typ: u(Date, null) },
        { json: "date_paid_gmt", js: "date_paid_gmt", typ: u(Date, null) },
        { json: "date_completed", js: "date_completed", typ: u(Date, null) },
        { json: "date_completed_gmt", js: "date_completed_gmt", typ: u(Date, null) },
        { json: "cart_hash", js: "cart_hash", typ: "" },
        { json: "meta_data", js: "meta_data", typ: a(r("MetaDatum")) },
        { json: "line_items", js: "line_items", typ: a(r("LineItem")) },
        { json: "tax_lines", js: "tax_lines", typ: a(r("TaxLine")) },
        { json: "shipping_lines", js: "shipping_lines", typ: a(r("ShippingLine")) },
        { json: "fee_lines", js: "fee_lines", typ: a("any") },
        { json: "coupon_lines", js: "coupon_lines", typ: a("any") },
        { json: "refunds", js: "refunds", typ: a(r("Refund")) },
        { json: "_links", js: "_links", typ: r("Links") },
    ], false),
    "Links": o([
        { json: "self", js: "self", typ: a(r("Collection")) },
        { json: "collection", js: "collection", typ: a(r("Collection")) },
        { json: "customer", js: "customer", typ: u(undefined, a(r("Collection"))) },
    ], false),
    "Collection": o([
        { json: "href", js: "href", typ: "" },
    ], false),
    "Ing": o([
        { json: "first_name", js: "first_name", typ: "" },
        { json: "last_name", js: "last_name", typ: "" },
        { json: "company", js: "company", typ: "" },
        { json: "address_1", js: "address_1", typ: "" },
        { json: "address_2", js: "address_2", typ: "" },
        { json: "city", js: "city", typ: "" },
        { json: "state", js: "state", typ: "" },
        { json: "postcode", js: "postcode", typ: "" },
        { json: "country", js: "country", typ: "" },
        { json: "email", js: "email", typ: u(undefined, "") },
        { json: "phone", js: "phone", typ: u(undefined, "") },
    ], false),
    "LineItem": o([
        { json: "id", js: "id", typ: 0 },
        { json: "name", js: "name", typ: "" },
        { json: "product_id", js: "product_id", typ: 0 },
        { json: "variation_id", js: "variation_id", typ: 0 },
        { json: "quantity", js: "quantity", typ: 0 },
        { json: "tax_class", js: "tax_class", typ: "" },
        { json: "subtotal", js: "subtotal", typ: "" },
        { json: "subtotal_tax", js: "subtotal_tax", typ: "" },
        { json: "total", js: "total", typ: "" },
        { json: "total_tax", js: "total_tax", typ: "" },
        { json: "taxes", js: "taxes", typ: a(r("Tax")) },
        { json: "meta_data", js: "meta_data", typ: a(r("MetaDatum")) },
        { json: "sku", js: "sku", typ: "" },
        { json: "price", js: "price", typ: 0 },
    ], false),
    "MetaDatum": o([
        { json: "id", js: "id", typ: 0 },
        { json: "key", js: "key", typ: "" },
        { json: "value", js: "value", typ: "" },
    ], false),
    "Tax": o([
        { json: "id", js: "id", typ: 0 },
        { json: "total", js: "total", typ: "" },
        { json: "subtotal", js: "subtotal", typ: "" },
    ], false),
    "Refund": o([
        { json: "id", js: "id", typ: 0 },
        { json: "refund", js: "refund", typ: "" },
        { json: "total", js: "total", typ: "" },
    ], false),
    "ShippingLine": o([
        { json: "id", js: "id", typ: 0 },
        { json: "method_title", js: "method_title", typ: "" },
        { json: "method_id", js: "method_id", typ: "" },
        { json: "total", js: "total", typ: "" },
        { json: "total_tax", js: "total_tax", typ: "" },
        { json: "taxes", js: "taxes", typ: a("any") },
        { json: "meta_data", js: "meta_data", typ: a(r("MetaDatum")) },
    ], false),
    "TaxLine": o([
        { json: "id", js: "id", typ: 0 },
        { json: "rate_code", js: "rate_code", typ: "" },
        { json: "rate_id", js: "rate_id", typ: 0 },
        { json: "label", js: "label", typ: "" },
        { json: "compound", js: "compound", typ: true },
        { json: "tax_total", js: "tax_total", typ: "" },
        { json: "shipping_tax_total", js: "shipping_tax_total", typ: "" },
        { json: "meta_data", js: "meta_data", typ: a("any") },
    ], false),
};
