import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SurveyComponent} from "./survey/survey.component";
import {AdminComponent} from "./admin.component";
import {AuthGuard} from "../../shared/service/auth.guard";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AdminComponent,
                pathMatch:'full',
            },
            {
                path: 'survey',
                component: SurveyComponent,
            }
        ])
    ],
    declarations:[
        SurveyComponent,
        AdminComponent
    ],
    providers:[]
})

export class AdminModule { }
