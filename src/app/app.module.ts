import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AngularMaterialModule } from './angularMaterial.module';
import { ListadoPreciosComponent } from './components/listado-precios/listado-precios.component';
import { PrecioItemRowComponent } from './components/precio-item-row/precio-item-row.component';
import { InterceptorService } from './services/interceptor.service';
import { PrecioService } from './services/precio.service';
import { TokenService } from './services/token.service';
import { FiltroPreciosComponent } from './components/filtro-precios/filtro-precios.component';
import { RubroService } from './services/rubro.sevice';
import { AppService } from './services/app.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    ListadoPreciosComponent,
    PrecioItemRowComponent,
    FiltroPreciosComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  providers: [
    PrecioService,
    TokenService,
    RubroService,
    AppService,
    {
      provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
