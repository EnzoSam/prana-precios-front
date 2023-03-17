import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoPreciosComponent } from './components/listado-precios/listado-precios.component';
import { routesPaths } from './constants/app-routes.constants';

const routes: Routes = [
  {
    path:'',
    redirectTo:routesPaths.home,
    pathMatch:'full'
  },
  {
    path:routesPaths.precios,
    component:ListadoPreciosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
