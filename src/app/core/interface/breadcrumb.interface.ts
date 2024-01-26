export interface BreadcrumbItem {
  /**
   * Text of the item.
   */
  label?: string;
  /**
   * Icon of the item.
   */
  icon?: string;
  /**
   * External link to navigate when item is clicked.
   */
  url?: string;
  /**
   * Visibility of submenu.
   */
  expanded?: boolean;
  /**
   * When set as true, disables the menuitem.
   */
  disabled?: boolean;
  /**
   * Inline style of the item's icon.
   */
  iconStyle?:
     {
        [klass: string]: any;
      }
    | null
    | undefined;
  /**
   * Class of the item's icon.
   */
  iconClass?: string;

  /**
   * RouterLink definition for internal navigation.
   */
  routerLink?: any;

     /**
     * Defines the item as a separator.
     */
     separator?: boolean;
}
