import { MenuItemCommandEvent } from "primeng/api";

export interface SearchMenuFilter {
    value: number;
    label: string;
    placeholder: string;
    command?(event: MenuItemCommandEvent): void;
}