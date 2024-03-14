import { EventEmitter } from "@angular/core";

export interface MyButtonInterface {
    label: string;
    type: 'button' | 'link';
    icon?: string;
    disabled?: boolean;
    severity: 'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger' | string | undefined;
    style?: {
        [klass: string]: any;
    } | null | undefined;
    styleClass?: string | undefined;
    onClick?: EventEmitter<MouseEvent>;
    onFocus?: EventEmitter<FocusEvent>;

}