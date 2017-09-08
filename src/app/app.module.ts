import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ChartsComponent } from './charts/charts.component';
import { HomeComponent } from './home/home.component';
import { routing, appRoutingProviders } from './app.routes';
import { PiechartsComponent } from './piecharts/piecharts.component';
import {MenuModule} from 'primeng/primeng';
import {MenuItem} from 'primeng/components/common/api';  
//import { MomentModule } from 'angular2-moment';
//import { DataService }  from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
    HomeComponent,
    PiechartsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    routing,
    MenuModule//,
    //MomentModule
    //MenuItem,
    
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
