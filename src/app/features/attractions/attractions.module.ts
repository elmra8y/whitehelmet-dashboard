import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AttractionsRoutingModule} from './attractions-routing.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AttractionsFormDialogComponent} from './attractions-form-dialog/attractions-form-dialog.component';
import {AttractionsListComponent} from './attractions-list/attractions-list.component';

@NgModule({
  declarations: [
    AttractionsFormDialogComponent,
    AttractionsListComponent
  ],
  imports: [
    CommonModule,
    AttractionsRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AttractionsModule {
}
