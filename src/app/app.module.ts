import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ForditoComponent } from './components/fordito/fordito.component';
import { SzinonimakComponent } from './components/szinonimak/szinonimak.component';
import { ForditoService}  from './service/fordito.service';
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    HomeComponent,
    ForditoComponent,
    SzinonimakComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    CommonModule
  ],
  providers: [ForditoService],
  bootstrap: [HomeComponent]
})
export class AppModule { }
