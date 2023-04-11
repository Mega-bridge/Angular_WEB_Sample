import {Component} from "@angular/core";

@Component({
    selector: 'app-dashboard-drag-and-drop',
    templateUrl: 'drag-and-drop.component.html',
    styles: [`
        .container {
            height: 300px;
            width: 600px;
            display: grid;
            gap: 40px;
            grid-template-columns: 50% 50%;
        }

        .my-drop {
            padding: 10px;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            border-width: 3px;
            border-style: solid;
            border-radius: 5px;
            border-color: lightgray;
            transition: border-color .2s ease-in-out;
        }

        .k-button {
            position: absolute;
            z-index: 10;
        }

        .entered {
            border-color: orange;
        }
    `]
})

export class DragAndDropComponent {

    public dropTargets = ['A', 'B', 'C', 'D'];
    public currentBox = 'A';
    public enteredBox = 'A';
    public hintText = 'Drag Me!';
    public showFish: boolean = false;
    // public btnText = 'Press Me!';

    // public handlePress(): void {
    //     this.btnText = 'Drag Me!';
    // }

    public handleDrop(id: string): void {
        this.currentBox = id;
        this.hintText = 'Drag Me!';
        this.btnText = 'Press Me!';
    }

    public handleDragEnter(id: string): void {
        this.enteredBox = id;

        if (this.enteredBox !== this.currentBox) {
            this.hintText = 'Drop Me!';
        }
    }

    public handleDragLeave(): void {
        this.enteredBox = '';
        this.hintText = 'Drag Me!';
    }

    public pressed = false;
    public dragged = false;
    public btnText = "Press Me!";

    handlePress(): void {
        this.pressed = true;
        this.btnText = "Drag Me!";
    }

    handleDragStart(): void {
        this.dragged = true;
    }

    reset(): void {
        this.dragged = false;
        this.pressed = false;
        this.btnText = "Press Me!";
    }
}