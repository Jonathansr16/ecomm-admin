
export interface MelyAskResult {
    date_created:         Date;
    item_id:              string;
    seller_id:            number;
    status:               QuestionStatus;
    text:                 string;
    tags:                 any[];
    id:                   number;
    deleted_from_listing: boolean;
    hold:                 boolean;
    answer:               Answer;
    from:                 From;
    question_item: MelyAskProduct;
}

export interface MelyAskProduct {
    id: string;
    title: string;
    sku: string;
    price: number;
    status: string;
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
    questions:         Question[];
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
    sorts:       Sort[];
    caller:      number;
    seller:      number;
    client_id:   number;
}

export interface Sort {
    field: string;
    type:  string;
}

export interface Question {
    date_created:         Date;
    item_id:              string;
    seller_id:            number;
    status:               QuestionStatus;
    text:                 string;
    tags:                 any[];
    id:                   number;
    deleted_from_listing: boolean;
    hold:                 boolean;
    answer:               Answer;
    from:                 From;
}

export interface Answer {
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

export enum QuestionStatus {
    Answered = "ANSWERED",
}
