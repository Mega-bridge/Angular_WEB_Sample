import { NgModule } from '@angular/core';
import { DashBoardComponent } from './dash-board.component';
import { RouterModule } from '@angular/router';
import {TableModule} from "../table/table.module";
import {ChartModule} from "../charts/charts.module";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  imports: [
    RouterModule.forChild([
          {
            path: 'dashboard',
            component: DashBoardComponent
          }
    ]),
    TableModule,
    ChartModule,
    SharedModule
      ],
  declarations: [DashBoardComponent],
})
export class DashBoardModule { }
