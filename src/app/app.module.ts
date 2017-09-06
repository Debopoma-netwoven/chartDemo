import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { ChartsComponent } from './charts/charts.component';
import { HomeComponent } from './home/home.component';
import { routing, appRoutingProviders } from './app.routes';
import { PiechartsComponent } from './piecharts/piecharts.component';
import { DataService }  from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
    HomeComponent,
    PiechartsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
