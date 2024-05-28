export interface IntegrationData {
    id: number;
    label: string;
    img: IntegrationImg;
}

interface IntegrationImg {
    url: string;
    alt: string;
}