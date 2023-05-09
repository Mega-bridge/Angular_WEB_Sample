import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SurveyComponent} from "./survey/survey.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'survey',
                component: SurveyComponent
            }
        ])
    ],
    declarations:[
        SurveyComponent
    ],
    providers:[]
})

export class AdminModule { }
