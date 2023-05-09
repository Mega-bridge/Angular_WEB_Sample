import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from "../shared/layout/layout.component";
import {TutorialComponent} from "./tutorial/tutorial.component";
import {InputInfoComponent} from "./input-info/input-info.component";
import {MainComponent} from "./main/main.component";
import {SignUpComponent} from "./login/sign-up/sign-up.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "../shared/service/auth.guard";
import {ModifyInputInfoComponent} from "./input-info/modify/modify-input-info.component";

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
        component: LoginComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent
      },
      {
        path: 'input-info',
        component: InputInfoComponent
      },
      {
        path: 'modify-input-info',
        component: ModifyInputInfoComponent
      },
      {
        path: 'tutorial',
        canActivate: [AuthGuard],
        component: TutorialComponent
      },
      {
        path: 'DrawFishFamily',
        canActivate:[AuthGuard],
        loadChildren: () => import('./dashboard/dash-board.module').then(i => i.DashBoardModule)
      },


    ]
  },
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./admin/admin.module').then(i => i.AdminModule)
      }
    ],

  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
