import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UsersListComponent} from './users-list/users-list.component';
import {UserFormDialogComponent} from './user-form-dialog/user-form-dialog.component';

@NgModule({
  declarations: [
    UsersListComponent,
    UserFormDialogComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class UsersModule { }
