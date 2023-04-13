import {Component, ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';
import { fabric } from 'fabric';
@Component({
        selector:'app-canvas',
        templateUrl:'canvas.component.html',
    }
)

export class CanvasComponent implements AfterViewInit{
    @ViewChild('htmlCanvas') htmlCanvas: ElementRef;

    private canvas: fabric.Canvas = new fabric.Canvas('Canvas');

    public url: string | ArrayBuffer = '';
    public size: any = {
        width: 1900,
        height: 650
    };

    public json: any;
    private globalEditor = false;
    public textEditor = false;
    private imageEditor = false;
    public figureEditor = false;
    public selected: any;

    constructor() {
        this.htmlCanvas = new ElementRef<HTMLCanvasElement>(document.createElement('canvas'));
    }

    ngAfterViewInit(): void {
        this.canvas = new fabric.Canvas(this.htmlCanvas.nativeElement, {
            hoverCursor: 'pointer',
            selection: true,
            selectionBorderColor: 'blue',
            isDrawingMode: false
        });

        this.canvas.on({
            'object:moving': (e) => { },
            'object:modified': (e) => { },
            'object:selected': (e) => {

                const selectedObject = e.target;
                this.selected = selectedObject;
            },
            'selection:cleared': (e) => {
                this.selected = null;
                this.resetPanels();
            }
        });

        this.canvas.setWidth(this.size.width);
        this.canvas.setHeight(this.size.height);

    }

    changeSize() {
        this.canvas.setWidth(this.size.width);
        this.canvas.setHeight(this.size.height);
    }

    getImgPolaroid(event:any) {
        const el = event.target;
        fabric.loadSVGFromURL(el.src, (objects, options) => {
            const image = fabric.util.groupSVGElements(objects, options);
            // this.canvas.on('object:moving', (event) => {
            //     const fabricImg = event.target as fabric.Image;
            //     console.log(`이미지의 좌표: (${fabricImg.left}, ${fabricImg.top})`);
            // });
            image.set({
               scaleX:0.2,
                scaleY:0.2,
                left:900,
                top:400

            });
            this.extend(image, this.randomId());
            this.canvas.add(image);
            this.selectItemAfterAdded(image);

        });
    }

    selectItemAfterAdded(obj:any) {
        this.canvas.discardActiveObject().renderAll();
        this.canvas.setActiveObject(obj);
    }

    extend(obj :any, id: number) {
        obj.toObject = ((toObject) => {
            return () => {
                return fabric.util.object.extend(toObject.call(this), {
                    id
                });
            };
        })(obj.toObject);
    }

    randomId() {
        return Math.floor(Math.random() * 999999) + 1;
    }

    resetPanels() {
        this.textEditor = false;
        this.imageEditor = false;
        this.figureEditor = false;
    }

    removeSelected() {
        const activeObject = this.canvas.getActiveObject();
        const activeGroup = this.canvas.getActiveObjects();

        if (activeObject) {
            this.canvas.remove(activeObject);
            // this.textString = '';
        } else if (activeGroup) {
            this.canvas.discardActiveObject();
            const self = this;
            activeGroup.forEach((object) => {
                self.canvas.remove(object);
            });
        }
    }

    drawingMode(){
        this.canvas.isDrawingMode = !this.canvas.isDrawingMode;
    }

    clear(){
        this.canvas.clear().renderAll();
    }

    getObject(){
        const positions: { x: number | undefined; y: number | undefined; }[] = [];
        const objects = this.canvas.getObjects();
        objects.forEach((object) => {
            positions.push({x: object.left, y: object.top});
        });
        console.log(positions)
    }

}
