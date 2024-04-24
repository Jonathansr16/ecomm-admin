import { Routes } from "@angular/router";

export const MelyRoutes: Routes = [
  
    {  
        path: 'inventario', 
        loadComponent: () => import('@mely/pages/inventory/inventory.component')
    }
];
