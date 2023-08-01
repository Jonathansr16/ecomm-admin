import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpComponent } from './component/help/help.component';

const ayudaRoutes: Routes = [
   
  { path: 'dashboard/soporte', redirectTo: 'ayuda/soporte', pathMatch: 'full'},
  { path: 'soporte', component: HelpComponent },

];

@NgModule({
  imports: [RouterModule.forChild(ayudaRoutes)],
  exports: [RouterModule]
})
export class AyudaRoutingModule { }
