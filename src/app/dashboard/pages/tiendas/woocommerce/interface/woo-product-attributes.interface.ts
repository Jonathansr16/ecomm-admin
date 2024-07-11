export interface WooProductAttibutesResul {
    id: number;
    name: string;
    type: string;
}

export interface WooProductAttributes {
    id:           number;
    name:         string;
    slug:         string;
    type:         string;
    order_by:     string;
    has_archives: boolean;
    _links:       Links;
}

export interface Links {
    self:       Collection[];
    collection: Collection[];
}

export interface Collection {
    href: string;
}
