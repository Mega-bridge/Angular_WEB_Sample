import { NgModule } from '@angular/core';
import { DashBoardComponent } from './dash-board.component';
import { RouterModule } from '@angular/router';
import {TableModule} from "../table/table.module";
import {ChartModule} from "../charts/charts.module";
import {SharedModule} from "../../shared/shared.module";
import {DragAndDropComponent} from "./drag-and-drop/drag-and-drop.component";
import {DragAndDropModule} from "@progress/kendo-angular-utils";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ButtonsModule} from "@progress/kendo-angular-buttons";


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DashBoardComponent,
        pathMatch: 'full',
      },

      {
        path: 'dragAndDrop',
        component: DragAndDropComponent
      },
    ]),
    TableModule,
    ChartModule,
    SharedModule,
    DragAndDropModule,
    NgClass,
    ButtonsModule,
    NgForOf,
    NgIf
  ],
  declarations: [
      DashBoardComponent,
    DragAndDropComponent,
  ],
})
export class DashBoardModule { }
