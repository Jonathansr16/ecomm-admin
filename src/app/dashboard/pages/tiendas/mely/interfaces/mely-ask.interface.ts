
export interface MelyAskResult {
    date_created:         Date;
    item_id:              string;
    seller_id:            number;
    question_status:      QuestionStatus;
    question:             string;
    tags:                 any[];
    id:                   number;
    deleted_from_listing: boolean;
    hold:                 boolean;
    answer?:               MelyAnswer;
    from:                 From;
    question_item: MelyAskProduct;
}

export interface MelyAskProduct {
    id: string;
    title: string;
    sku: string;
    price: number;
    product_status: 'active' | 'inactive';
    img: MelyAskImg
    isFulfillment: boolean;
}

export interface MelyAskImg {
    id: string;
    url: string;
    alt: string;
}

export interface MelyAsk {
    total:             number;
    limit:             number;
    questions:         MelyQuestion[];
    filters:           Filters;
    available_filters: AvailableFilter[];
    available_sorts:   string[];
}

export interface AvailableFilter {
    id:      string;
    name:    string;
    type:    string;
    values?: string[];
}

export interface Filters {
    limit:       number;
    offset:      number;
    api_version: string;
    is_admin:    boolean;
    sorts:       MelySort[];
    caller:      number;
    seller:      number;
    client_id:   number;
}

export interface MelySort {
    field: string;
    type:  string;
}

export interface MelyQuestion {
    date_created:         Date;
    item_id:              string;
    seller_id:            number;
    status:               QuestionStatus;
    text:                 string;
    tags:                 any[];
    id:                   number;
    deleted_from_listing: boolean;
    hold:                 boolean;
    answer:               MelyAnswer;
    from:                 From;
}

export interface MelyAnswer {
    text:         string;
    status:       AnswerStatus;
    date_created: Date;
}

export enum AnswerStatus {
    Active = "ACTIVE",
}

export interface From {
    id: number;
}

export interface QuestionStatus {
    answered: "ANSWERED" | 'UNANSWERED',
}
