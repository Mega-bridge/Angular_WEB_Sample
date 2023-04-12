import { NgModule } from '@angular/core';
import { DashBoardComponent } from './dash-board.component';
import { RouterModule } from '@angular/router';
import {TableModule} from "../table/table.module";
import {ChartModule} from "../charts/charts.module";
import {SharedModule} from "../../shared/shared.module";
import {DragAndDropComponent } from "./draw-fish-family/drag-and-drop/drag-and-drop.component"
import {DrawFishFamilyComponent} from "./draw-fish-family/draw-fish-family.component";


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DashBoardComponent,
        pathMatch: 'full',
      },

      {
        path: 'DrawFishFamily',
        component: DrawFishFamilyComponent
      },
    ]),
    TableModule,
    ChartModule,
    SharedModule,
  ],
  declarations: [
      DashBoardComponent,
    DragAndDropComponent,
    DrawFishFamilyComponent
  ],
  providers: [
    DrawFishFamilyComponent
  ]
})
export class DashBoardModule { }
