import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {DragAndDrop2Component} from "./drag-and-drop2.component";
import {SharedModule} from "@progress/kendo-angular-grid";
import {DragDropModule} from '@angular/cdk/drag-drop';
@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'drag',
                component: DragAndDrop2Component
            }
        ]),
        SharedModule,
        DragDropModule,
    ],
    declarations: [DragAndDrop2Component],
    exports: [
        DragAndDrop2Component,
    ]
})
export class DragAndDrop2Module { }
