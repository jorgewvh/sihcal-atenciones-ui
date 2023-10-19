import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
/* import { GoogleMapsModule } from '@angular/google-maps'; */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
// #fake-start#
import { FakeAPIService } from './_fake/fake-api.service';
/* import {NgxPrintModule} from "ngx-print"; */
import { ProxyModule } from './modules/proxy/proxy.module';
//import { CalculoPrestacionesModule } from './modules/calculo-prestaciones/calculo-prestaciones.module';

// #fake-end#

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
   /*  NgxPrintModule, */
    /* GoogleMapsModule, */
    // #fake-start#
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(FakeAPIService, {
          passThruUnknownUrl: true,
          dataEncapsulation: false,
        })
      : [],
    // #fake-end#
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    ProxyModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
