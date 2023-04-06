import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {TableComponent} from "./table.component";
import {NgForOf} from "@angular/common";
import {GridModule} from "@progress/kendo-angular-grid";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'table',
        component: TableComponent
      }
    ]),
    NgForOf,
    GridModule
  ],
  declarations: [TableComponent],
  exports: [
    TableComponent
  ]
})
export class TableModule { }
