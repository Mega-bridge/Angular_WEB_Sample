import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from "../shared/layout/layout.component";
import {TutorialComponent} from "./tutorial/tutorial.component";
import {InputInfoComponent} from "./input-info/input-info.component";
import {MainComponent} from "./main/main.component";
import {SignUpComponent} from "./login/sign-up/sign-up.component";
import {LoginComponent} from "./login/login.component";

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
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'sign-up',
        component: SignUpComponent
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

    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
