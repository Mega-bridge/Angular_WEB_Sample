import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {DragAndDrop3Component} from "./drag-and-drop3.component";
import {SharedModule} from "@progress/kendo-angular-grid";
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CanvasComponent} from "./canvas/canvas.component";
import {FormsModule} from "@angular/forms";
@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'drag1',
                component: DragAndDrop3Component
            }
        ]),
        SharedModule,
        DragDropModule,
        FormsModule,
    ],
    declarations: [DragAndDrop3Component,CanvasComponent],
    exports: [
        DragAndDrop3Component,
    ]
})
export class DragAndDrop3Module { }
