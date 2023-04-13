import {Component, OnInit} from "@angular/core";
import {CdkDragEnd, CdkDragStart} from "@angular/cdk/drag-drop";
@Component({
        selector:'app-drag',
        templateUrl:'drag-and-drop2.component.html',
    styleUrls:['./drag-and-drop2.component.scss']
    }
)

export class DragAndDrop2Component implements OnInit{

    ngOnInit() {
    }

    // onDragEnded(event:any) {
    //     this.p = event.source.getRootElement().getBoundingClientRect();
    //     console.log(this.p)
    //     // this.p
    // }

    p = { x: 0, y: 0 };

    // onDragStarted(){
    //     return `<div>
    //     <img src="기본고래_1지느러미.png">
    //         </div>`
    // }
    // onDragEnded(event: CdkDragEnd) {
    //     const element = event.source.getRootElement();
    //     const bounds = element.getBoundingClientRect();
    //     this.p = {
    //         x: bounds.left,
    //         y: bounds.top
    //     };
    // }
    // p = { x: 0, y: 0 };
    // showFirstImage = true;
    // showSecondImage = false;
    //
    // onDragEnded(event: CdkDragEnd) {
    //     this.p = event.source.getFreeDragPosition();
    //     if (this.p.x < 0) {
    //         this.showFirstImage = true;
    //         this.showSecondImage = false;
    //     } else {
    //         this.showFirstImage = false;
    //         this.showSecondImage = true;
    //     }
    // }
    //
    // onDragStarted(event: CdkDragStart) {
    //     this.showFirstImage = true;
    //     this.showSecondImage = false;
    // }

    draggedImageIndex = 0;
    imagePositions1: {x: number, y: number}[] = [{x: 0, y: 0}];
    imagePositions2: {x: number, y: number}[] = [{x: 0, y: 0}];
    imagePositions3: {x: number, y: number}[] = [{x: 0, y: 0}];

    onDragStarted(event: CdkDragStart) {
        // this.draggedImageIndex = 0;
    }


    onDragEnded_1(event: CdkDragEnd) {
            const element = event.source.getRootElement();
            const bounds = element.getBoundingClientRect();
            this.imagePositions1.push(this.p = {
                x: bounds.left,
                y: bounds.top
            });

        event.source.reset();
    }
    onDragEnded_2(event: CdkDragEnd) {
        const element = event.source.getRootElement();
        const bounds = element.getBoundingClientRect();
        this.imagePositions2.push(this.p = {
            x: bounds.left,
            y: bounds.top
        });

        event.source.reset();
    }
    onDragEnded_3(event: CdkDragEnd) {
        const element = event.source.getRootElement();
        const bounds = element.getBoundingClientRect();
        this.imagePositions3.push(this.p = {
            x: bounds.left,
            y: bounds.top
        });

        event.source.reset();
    }




}
