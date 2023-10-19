import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryHistoryCatalogService } from './salary-history-catalog/salary-history-catalog.service';
import { LookupsService } from './lookups/lookups.service';

// custom services

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ], providers: [
    SalaryHistoryCatalogService,
    LookupsService
    // custom services
  ]
})
export class ServicesModule { }
