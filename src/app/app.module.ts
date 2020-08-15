import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ForditoComponent } from './components/fordito/fordito.component';
import { ForditoService}  from './service/fordito.service';
import { NyelvService}  from './service/nyelv.service';
import { FormsModule } from '@angular/forms';
import { HttpErrorInterceptor } from './service/http-error.interceptor';
import { NavingComponent } from './components/naving/naving.component';

@NgModule({
  declarations: [
    HomeComponent,
    ForditoComponent,
    NavingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule
  ],
  providers: [ForditoService,
    NyelvService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
    }
  ],
  bootstrap: [NavingComponent]
})
export class AppModule { }
