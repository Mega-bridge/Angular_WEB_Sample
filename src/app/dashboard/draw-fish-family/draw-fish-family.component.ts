import {Component, ViewChild} from "@angular/core";
import {DragAndDropComponent} from "./drag-and-drop/drag-and-drop.component"

@Component({
    selector: 'app-dashboard-draw-fish-family',
    templateUrl: 'draw-fish-family.component.html',
    styleUrls: ['draw-fish-family.component.scss']
})

export class DrawFishFamilyComponent {

    @ViewChild('canvas', { static: false }) canvas !: DragAndDropComponent;

    title = 'fabricCanvasSample';



    constructor() {}

    public getImgPolaroid(event:any) {
        this.canvas.getImgPolaroid(event);
    }

    public drawMode() {
        this.canvas.drawingMode();
    }

    public removeSelected() {
        this.canvas.removeSelected();
    }
}
