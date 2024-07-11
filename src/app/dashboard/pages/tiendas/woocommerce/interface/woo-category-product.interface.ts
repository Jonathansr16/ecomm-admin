export interface IdCategoryByProduct {
    id: number;
}

export interface WooCategoryResult {
id: number,
name: string;
parent: number
items: number
}

export interface WooCategory {
    id:              number;
    name:            string;
    slug:            string;
    parent:          number;
    description:     string;
    display:         Display;
    image:           null;
    menu_order:      number;
    count:           number;
    yoast_head:      string;
    yoast_head_json: YoastHeadJSON;
    _links:          Links;
}

export interface Links {
    self:       Collection[];
    collection: Collection[];
    up?:        Collection[];
}

export interface Collection {
    href: string;
}

export enum Display {
    Default = "default",
}

export interface YoastHeadJSON {
    title:        string;
    robots:       Robots;
    canonical:    string;
    og_locale:    OgLocale;
    og_type:      OgType;
    og_title:     string;
    og_url:       string;
    og_site_name: OgSiteName;
    og_image:     OgImage[];
    twitter_card: TwitterCard;
    schema:       Schema;
}

export interface OgImage {
    width:  number;
    height: number;
    url:    string;
    type:   Type;
}

export enum Type {
    ImagePNG = "image/png",
}

export enum OgLocale {
    EsES = "es_ES",
}

export enum OgSiteName {
    Servitae = "Servitae",
}

export enum OgType {
    Article = "article",
}

export interface Robots {
    index:               Index;
    follow:              Follow;
    "max-snippet":       MaxSnippet;
    "max-image-preview": MaxImagePreview;
    "max-video-preview": MaxVideoPreview;
}

export enum Follow {
    Follow = "follow",
}

export enum Index {
    Index = "index",
}

export enum MaxImagePreview {
    MaxImagePreviewLarge = "max-image-preview:large",
}

export enum MaxSnippet {
    MaxSnippet1 = "max-snippet:-1",
}

export enum MaxVideoPreview {
    MaxVideoPreview1 = "max-video-preview:-1",
}

export interface Schema {
    "@context": string;
    "@graph":   Graph[];
}

export interface Graph {
    "@type":          GraphType;
    "@id":            string;
    url?:             string;
    name?:            string;
    isPartOf?:        Breadcrumb;
    breadcrumb?:      Breadcrumb;
    inLanguage?:      InLanguage;
    itemListElement?: ItemListElement[];
    description?:     Description;
    publisher?:       Breadcrumb;
    potentialAction?: PotentialAction[];
    logo?:            Logo;
    image?:           Breadcrumb;
}

export enum GraphType {
    BreadcrumbList = "BreadcrumbList",
    CollectionPage = "CollectionPage",
    Organization = "Organization",
    WebSite = "WebSite",
}

export interface Breadcrumb {
    "@id": string;
}

export enum Description {
    TiendaEnLinea = "Tienda en linea",
}

export enum InLanguage {
    Es = "es",
}

export interface ItemListElement {
    "@type":  ItemListElementType;
    position: number;
    name:     string;
    item?:    string;
}

export enum ItemListElementType {
    ListItem = "ListItem",
}

export interface Logo {
    "@type":    LogoType;
    inLanguage: InLanguage;
    "@id":      string;
    url:        string;
    contentUrl: string;
    width:      number;
    height:     number;
    caption:    OgSiteName;
}

export enum LogoType {
    ImageObject = "ImageObject",
}

export interface PotentialAction {
    "@type":       PotentialActionType;
    target:        Target;
    "query-input": QueryInput;
}

export enum PotentialActionType {
    SearchAction = "SearchAction",
}

export enum QueryInput {
    RequiredNameSearchTermString = "required name=search_term_string",
}

export interface Target {
    "@type":     TargetType;
    urlTemplate: URLTemplate;
}

export enum TargetType {
    EntryPoint = "EntryPoint",
}

export enum URLTemplate {
    HTTPSServitaeMXSSearchTermString = "https://servitae.mx/?s={search_term_string}",
}

export enum TwitterCard {
    SummaryLargeImage = "summary_large_image",
}
