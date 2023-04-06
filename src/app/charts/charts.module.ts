import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ChartsComponent} from "./charts.component";
import {TileLayoutModule} from "@progress/kendo-angular-layout";
import { ChartsModule } from "@progress/kendo-angular-charts";
import {SharedModule} from "@progress/kendo-angular-grid";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'charts',
        component: ChartsComponent
      }
    ]),
    TileLayoutModule,
    ChartsModule,
    SharedModule

  ],
  declarations: [ChartsComponent],
  exports: [
    ChartsComponent
  ]
})
export class ChartModule { }
