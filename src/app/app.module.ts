import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbPaginationModule, NgbTimepickerModule, NgbNavModule, NgbModalRef, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './header/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { LoginComponent } from './login/login.component';

// API
import { API_BASE_URL } from './core/api.client.generated';
import { environment } from '../environments/environment';
import { Service } from './core/api.client.generated';
import { ViewApInvoiceComponent } from './shared/view-ap-invoice/view-ap-invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MonitoringComponent,
    LoginComponent,
    ViewApInvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbPaginationModule,
    NgbTimepickerModule,
    NgbNavModule,
    HttpClientModule
  ],
  providers: [
    Service,
    HttpClientModule,
    {
      provide: API_BASE_URL,
      useFactory: () => {
        return environment.API_BASE_URL;
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
