import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TableComponent} from "./table/table.component";
import {LoginComponent} from "./login/login.component";
import {LayoutComponent} from "../shared/layout/layout.component";
import {ChartsComponent} from "./charts/charts.component";
import {DragAndDrop2Component} from "./drag-and-drop2/drag-and-drop2.component";
import {DragAndDrop3Component} from "./drag-and-drop3/drag-and-drop3.component";

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () => import('./login/login.module').then(i => i.LoginModule)
  },
  {
    path:'',
    component:LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dash-board.module').then(i => i.DashBoardModule)
      },
      {
        path: 'charts',
        component: ChartsComponent,
        loadChildren: () => import('./charts/charts.module').then(i => i.ChartModule),
      },
      {
        path: 'table',
        component: TableComponent,
        loadChildren: () => import('./table/table.module').then(i => i.TableModule),
      },
      {
        path: 'test',
        component: DragAndDrop2Component,
        loadChildren: () => import('./drag-and-drop2/drag-and-drop2.module').then(i => i.DragAndDrop2Module),
      },
      {
        path: 'test2',
        component: DragAndDrop3Component,
        loadChildren: () => import('./drag-and-drop3/drag-and-drop3.module').then(i => i.DragAndDrop3Module),
      },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
