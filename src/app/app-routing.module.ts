import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from "../shared/layout/layout.component";
import {TutorialComponent} from "./tutorial/tutorial.component";
import {InputInfoComponent} from "./input-info/input-info.component";
import {MainComponent} from "./main/main.component";

const routes: Routes = [

  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path:'',
    component:LayoutComponent,
    children: [
      {
        path: 'main',
        component: MainComponent,
        loadChildren: () => import('./main/main.module').then(i => i.MainModule)
      },
      {
        path: 'tutorial',
        component: TutorialComponent
      },
      {
        path: 'input-info',
        component: InputInfoComponent
      },
      {
        path: 'DrawFishFamily',
        loadChildren: () => import('./dashboard/dash-board.module').then(i => i.DashBoardModule)
      },
      // {
      //   path: 'charts',
      //   component: ChartsComponent,
      //   loadChildren: () => import('./charts/charts.module').then(i => i.ChartModule),
      // },
      // {
      //   path: 'table',
      //   component: TableComponent,
      //   loadChildren: () => import('./table/table.module').then(i => i.TableModule),
      // },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
