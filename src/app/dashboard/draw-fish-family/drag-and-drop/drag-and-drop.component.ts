import {AfterViewInit, Component, ElementRef, Injectable, ViewChild} from "@angular/core";
import { fabric } from 'fabric';


@Component({
    selector: 'app-dashboard-drag-and-drop',
    templateUrl: 'drag-and-drop.component.html',
    styles: [`
        #canvas {
            border: 2px dashed #cccccc;
        }
    `]
})

@Injectable({
    providedIn: 'root'
})

export class DragAndDropComponent implements AfterViewInit{

    @ViewChild('htmlCanvas', {read: ElementRef})
    public htmlCanvasElement!: ElementRef;

    public canvas: fabric.Canvas;


    public props = {
        canvasFill: '#ffffff',
        canvasImage: '',
        id: null,
        opacity: 0,
        fill: null,
        fontSize: null,
        lineHeight: null,
        charSpacing: null,
        fontWeight: null,
        fontStyle: null,
        textAlign: null,
        fontFamily: null,
        TextDecoration: ''
    };

    public url: string | ArrayBuffer = '';
    public size: any = {
        width: 970,
        height: 800
    };

    public json: any;
    public textEditor = false;
    private imageEditor = false;
    public figureEditor = false;
    public selected: any;
    public moved: any;

    constructor() {
        this.canvas = new fabric.Canvas('canvas');
    }


    ngAfterViewInit(): void {

        // setup front side canvas
        this.canvas = new fabric.Canvas(this.htmlCanvasElement.nativeElement, {
            hoverCursor: 'pointer',
            selection: true,
            selectionBorderColor: 'blue',
            isDrawingMode: false,
        });

        console.log(this.canvas);
        this.canvas.on('object:selected',e => {
            console.log(e);
            const selectedObject: any = e.target;
            this.selected = selectedObject;
            selectedObject.hasRotatingPoint = true;
            selectedObject.transparentCorners = true;
            selectedObject.cornerColor = 'rgba(255, 87, 34, 0.7)';

            this.resetPanels();
        })

        // this.canvas.on({
        //     'object:moving': (e:any) => { },
        //     'object:modified': (e:any) => { },
        //     'object:selected': (e:any) => {
        //         console.log(e);
        //         const selectedObject: fabric.Object = e.target;
        //         this.selected = selectedObject;
        //         selectedObject.hasRotatingPoint = true;
        //         selectedObject.transparentCorners = true;
        //         selectedObject.cornerColor = 'rgba(255, 87, 34, 0.7)';
        //
        //         this.resetPanels();
        //
        //     },
        //     'selection:cleared': (e:fabric.IEvent) => {
        //         this.selected = null;
        //         this.resetPanels();
        //     },
        // });

        this.canvas.setWidth(this.size.width);
        this.canvas.setHeight(this.size.height);
        // this.canvas.setBackgroundImage('assets/img/originPort.png', this.canvas.renderAll.bind(this.canvas),{
        //     opacity: 1.0,
        //     originX: 'left',
        //     originY: 'top',
        // });


        // get references to the html canvas element & its context
        this.canvas.on('mouse:down', (e:fabric.IEvent) => {
            const canvasElement: any = document.getElementById('canvas');
        });

    }


    drawingMode() {
        this.canvas.isDrawingMode = !this.canvas.isDrawingMode;
    }

    getImgPolaroid(event: any) {
        const el = event.target;
        console.log(el);
        fabric.loadSVGFromURL(el.src, (objects, options) => {
            const image = fabric.util.groupSVGElements(objects, options);
            image.set({
                left: 10,
                top: 10,
                angle: 0,
                padding: 10,
                cornerSize: 20,
                cornerColor: 'rgba(255, 87, 34, 0.7)',
                hasRotatingPoint: true,
                selectable: true,
                strokeWidth:10
            });
            this.extend(image, this.randomId());
            this.canvas.add(image);
            console.log(image)
            this.selectItemAfterAdded(image);
        });
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
            activeGroup.forEach((object:fabric.Object) => {
                self.canvas.remove(object);
            });
        }
    }

    extend(obj:any, id:any) {
        obj.toObject = ((toObject) => {
            return function() {
                return fabric.util.object.extend(toObject.call(), {
                    id
                });
            };
        })(obj.toObject);
    }

    randomId() {
        return Math.floor(Math.random() * 999999) + 1;
    }

    selectItemAfterAdded(obj: any) {
        this.canvas.discardActiveObject().renderAll();
        this.canvas.setActiveObject(obj);
    }

    resetPanels() {
        this.textEditor = false;
        this.imageEditor = false;
        this.figureEditor = false;
    }


    // getId() {
    //     this.props.id = this.canvas.getActiveObject().toObject().id;
    // }
    // getOpacity() {
    //     this.props.opacity = this.getActiveStyle('opacity', null) * 100;
    // }

    getActiveStyle(styleName: any, object:any) {
        object = object || this.canvas.getActiveObject();
        if (!object) { return ''; }

        if (object.getSelectionStyles && object.isEditing) {
            return (object.getSelectionStyles()[styleName] || '');
        } else {
            return (object[styleName] || '');
        }
    }


}
