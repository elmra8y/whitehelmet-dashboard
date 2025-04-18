import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AttractionsListComponent} from './attractions-list/attractions-list.component';

const routes: Routes = [
  { path: '', component: AttractionsListComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttractionsRoutingModule { }
