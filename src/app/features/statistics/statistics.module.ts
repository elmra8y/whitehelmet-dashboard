import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { StatisticsRoutingModule } from './statistics-routing.module';
import {BaseChartDirective, provideCharts, withDefaultRegisterables} from 'ng2-charts';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PetSalesComponent} from './pet-sales/pet-sales.component';

@NgModule({
  declarations: [
    PetSalesComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    BaseChartDirective,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    provideCharts(withDefaultRegisterables()),
    DatePipe
  ],
})
export class StatisticsModule { }
