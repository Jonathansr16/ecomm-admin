import { Routes } from "@angular/router";

export const integrationRoutes: Routes = [

    {
        path: 'mi-integraciones',
        loadComponent: () => 
            import('@integrations/integrations.component')
        
    }
]