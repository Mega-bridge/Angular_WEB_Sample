import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {SharedModule} from "../../shared/shared.module";
import {DragAndDropComponent } from "./draw-fish-family/drag-and-drop/drag-and-drop.component"
import {DrawFishFamilyComponent} from "./draw-fish-family/draw-fish-family.component";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {ButtonModule, ChipModule} from "@progress/kendo-angular-buttons";
import {InputsModule} from "@progress/kendo-angular-inputs";
import {PopupModule} from "@progress/kendo-angular-popup";


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: DrawFishFamilyComponent,
                pathMatch: 'full',
            },

            {
                path: 'DrawFishFamily',
                component: DrawFishFamilyComponent
            },
        ]),
        SharedModule,
        NgIf,
        NgForOf,
        NgStyle,
        ButtonModule,
        InputsModule,
        ChipModule,
        PopupModule,
    ],
  declarations: [
    DragAndDropComponent,
    DrawFishFamilyComponent
  ],
  providers: [
    DrawFishFamilyComponent
  ]
})
export class DashBoardModule { }
