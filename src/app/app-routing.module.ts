import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TableComponent} from "./table/table.component";
import {LoginComponent} from "./login/login.component";
import {LayoutComponent} from "../shared/layout/layout.component";
import {ChartsComponent} from "./charts/charts.component";

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
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
