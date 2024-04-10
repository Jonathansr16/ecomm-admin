export interface PendingOrdersResponse {
    totalpendientes: number;
    totalregistros: number;
    listapendientes: ListProductResponse[];
    versionConfig: string;
    versionAPP: string;
    tagManagerID: string;
    tagManagerIDCS: string;
    visibleMenuCV: boolean;   
}

export interface ListProductResponse {
    nopedido: string;
    estatus: string;
    fechacolocacion: Date;
    fechaautorizacion: Date;
    sku: string;
    articulo: string;
    claroid: string;
    idpedidorelacion: string;
    sla: string;
    comision: number;
    totalproducto: number;
    totalpedido: number;
    skuhijo: string;
}




