import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { PedidoComponent } from './pages/pedido/pedido.component';
import { CargarPedidoComponent } from './pages/cargar-pedido/cargar-pedido.component';
import { VerPedidoComponent } from './pages/ver-pedido/ver-pedido.component';
import { PreferenciasComponent } from './pages/preferencias/preferencias.component';
import { LoadOrderComponent } from './pages/load-order/load-order.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { SeeOrderComponent } from './pages/see-order/see-order.component';
import { OrderComponent } from './pages/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PedidoComponent,
    CargarPedidoComponent,
    VerPedidoComponent,
    PreferenciasComponent,
    LoadOrderComponent,
    PreferencesComponent,
    SeeOrderComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
