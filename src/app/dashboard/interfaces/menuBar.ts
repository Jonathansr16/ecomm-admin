export interface SidebarMenu {
    iconLeft?: string;
    label: string;
    iconRight?: string;
    items?: SidebarMenu[];
    type: 'button' | 'link';
    routerLink?: string;
    queryParams?: {
      [k: string]: any
    },
    isBadge: boolean;
    badgeClass?: string;
    badegeCount?: number;

   
   command?(event: MenuItemCommandEvent): void;
  }
  
  export interface MenuItemCommandEvent {
    /**
     * Browser event.
     */
    originalEvent?: Event;
    /**
     * Selected menu item.
     */
    item?: any;
    /**
     * Index of the selected item.
     */
    index?: number;
}
