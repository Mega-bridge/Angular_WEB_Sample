import {AfterViewInit, asNativeElements, Component, ElementRef, Injectable, OnInit, ViewChild} from "@angular/core";
import { fabric } from 'fabric';
import {MrObjectModel} from "../../../../shared/model/mr-object.model";
import {MindReaderControlService} from "../../../../shared/service/mind-reader-control.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertService} from "../../../../shared/service/alert.service";
import {MrDataSetRequestModel} from "../../../../shared/model/request/mr-data-set.request.model";


@Component({
    selector: 'app-dashboard-drag-and-drop',
    templateUrl: 'drag-and-drop.component.html',
})

@Injectable({
    providedIn: 'root'
})

export class DragAndDropComponent implements AfterViewInit{

    @ViewChild('htmlCanvas', {read: ElementRef})
    public htmlCanvasElement!: ElementRef;

    public canvas: fabric.Canvas;

    /** 어항 코드 */
    public fishbowlCode: number = 0;

    /** object request data 생성 */
    public mrObjectModelList: MrObjectModel[] = [];

    /** object data set 생성 */
    public mrDataSetModel: MrDataSetRequestModel = new MrDataSetRequestModel();


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

    public waterUrl: string = '';

    public url: string | ArrayBuffer = '';
    public size: any = {
        width: 900,
        height: 900
    };

    public json: any;
    public selected: any;
    public moved: any;

    public objectSeq: number = 0;


    /**
     *
     * @param mindReaderControlService
     * @param alertService
     */
    constructor(
        public mindReaderControlService: MindReaderControlService,
        private alertService: AlertService,
    ) {
        this.canvas = new fabric.Canvas('canvas');
    }

    ngAfterViewInit(): void {
        // setup front side canvas
        this.canvas = new fabric.Canvas(this.htmlCanvasElement.nativeElement, {
            hoverCursor: 'pointer',
            selection: true,
            selectionBorderColor: 'blue',
            isDrawingMode: false,
            backgroundColor:'#ffffff'
        });
        // this.canvas.setWidth(window.innerWidth * 0.61);
        // this.canvas.setHeight(window.innerHeight * 0.7);

        this.canvas.setWidth(this.size.width);
        this.canvas.setHeight(this.size.height);
        //
        //
        // window.addEventListener('resize', () => {
        //     this.canvas.setWidth(window.innerWidth * 0.7);
        //     this.canvas.setHeight(window.innerHeight * 0.7);
        //     this.canvas.renderAll();
        //
        //     // const canvasEl = document.getElementById('canvas');
        //     // if(canvasEl && canvasEl instanceof HTMLCanvasElement){
        //     //
        //     //     // canvasEl.width = window.innerWidth;
        //     //     // canvasEl.height = window.innerHeight;
        //     //     this.canvas.renderAll();
        //     // }
        //
        // });



        this.canvas.on('selection:created',e => {
            console.log(e);
            if(e.selected){
                const selectedObject = e.selected[0];
                this.getId();
                console.log('///////////////////////');
                console.log('object Id (timestamp): ' + this.props.id);
                console.log('object Name: ' + selectedObject.name);
                console.log('-----------------------');
            }

            // const selectedObject: any = e.selected? e.selected[0]: e.selected;
            //
            // // 선택된 객체 위에 삭제 버튼 추가
            // var deleteButton = new fabric.Text('X', {
            //     left: selectedObject.left + selectedObject.width,
            //     top: selectedObject.top,
            //     fontFamily: 'Arial',
            //     fontSize: 16,
            //     fill: 'white',
            //     backgroundColor: 'black',
            //     padding: 5
            // });
            // deleteButton.set({ left: selectedObject.left, top: selectedObject.top - selectedObject.height / 2 - 15 });
            // this.canvas.add(deleteButton);
            //
            // // 삭제 버튼 클릭 이벤트 핸들러
            // deleteButton.on('mousedown',e1 =>  {
            //     this.canvas.remove(selectedObject);
            //     this.canvas.remove(deleteButton);
            //     this.canvas.renderAll();
            // });
            // console.log(selectedObject.source);
            // console.log(selectedObject.toObject());



           // this.resetPanels();
        });

        // 위치 좌표값
        this.canvas.on('object:moving', e => {
            //console.log(e);
            const movedObject: any = e.target;
            var centerPoint = movedObject.getCenterPoint();
            console.log('////////Object Moving///////////////');
            console.log('centerPoint (X, Y): ' + centerPoint);
            // console.log('화면 X Point: ' + e.e.clientX);
            // console.log('화면 Y Point: ' + e.e.clientY);
            console.log('-----------------------');
        });

        // 각도값
        this.canvas.on('object:rotating', e => {
            const movedObject: any = e.target;
            console.log('////////Object Rotating///////////////');
            console.log('angle: ' + movedObject.angle);
            console.log('-----------------------');
        })


        // 상하좌우 대칭 여부
        this.canvas.on('object:modified', e => {
            //console.log(e);
            const modifiedObject = e.target;
            console.log('////////Object Modified///////////////');
            console.log('좌우 반전 여부:' + modifiedObject?.flipX);
            console.log('상하 반전 여부:' + modifiedObject?.flipY);
            console.log('Object Width:' + modifiedObject?.getScaledWidth());
            console.log('Object Height:' + modifiedObject?.getScaledHeight());
            // console.log('상하 반전 여부:' + modifiedObject?.cacheHeight);
            console.log('-----------------------');
        });

    }


    drawingMode() {
        this.canvas.isDrawingMode = !this.canvas.isDrawingMode;
    }

    /**
     * 어항 설정
     * @param opt
     * @param fishbowlCode
     */
    setWater(opt: string, fishbowlCode: number){
        this.waterUrl = opt;
        this.fishbowlCode = fishbowlCode;
        this.canvas.setBackgroundImage(this.waterUrl, this.canvas.renderAll.bind(this.canvas), {
            top: 150,
            left: -30,
            scaleX:0.55,
            scaleY: 0.55
        });

    }

    /**
     * 선택된 object canvas에 추가
     * @param event
     * @param familyType
     * @param objectCodeId
     */
    getImgPolaroid(event: any, objectCodeId: any,familyType?: any) {
        const el = event;
        fabric.loadSVGFromURL(el, (objects, options) => {
            const image = fabric.util.groupSVGElements(objects, options);
            image.set({
                left: 350,
                top: 380,
                angle: 0,
                padding: 10,
                cornerSize: 20,
                cornerColor: 'rgba(255, 87, 34, 0.7)',
                hasRotatingPoint: true,
                selectable: true,
                strokeWidth:10,
                name:familyType
            });
            this.extend(image, this.randomId(), new Date(),objectCodeId);
            //console.log(image.toObject().id);
            image.scale(0.15);
            this.canvas.add(image);

            this.selectItemAfterAdded(image);
        });
    }


    /**
     * 선택된 object 삭제
     */
    removeSelected() {

        const activeGroup = this.canvas.getActiveObjects();
        if (activeGroup) {
            console.log(activeGroup[0].toObject().id);
            this.canvas.discardActiveObject();
            const self = this;
            activeGroup.forEach((object:fabric.Object) => {
                self.canvas.remove(object);
            });
        }
    }


    /**
     * object에 id 프로퍼티 추가
     * @param obj
     * @param id
     * @param createDate
     * @param objectCodeId
     */
    extend(obj:any, id:any, createDate: Date,objectCodeId:any) {
        obj.toObject = ((toObject) => {
            return function() {
                return fabric.util.object.extend(toObject.call(obj), {
                    id,
                    objectCodeId,
                    createDate
                });
            };
        })(obj.toObject);
    }

    /**
     * object id 생성
     */
    randomId() {
        this.objectSeq += 1;
        return this.objectSeq;
        // return new Date();
    }

    /**
     * 선택된 object canvas위에 rendering
     * @param obj
     */
    selectItemAfterAdded(obj: any) {
        this.canvas.discardActiveObject().renderAll();
        this.canvas.setActiveObject(obj);
    }


    /**
     * 선택된 Object의 id값 불러오기
     */
    getId() {
        this.props.id = this.canvas.getActiveObject()?.toObject().id;

    }
    // getOpacity() {
    //     this.props.opacity = this.getActiveStyle('opacity', null) * 100;
    // }


    rasterize(dataSetSeq: any) {
        const image = new Image();
        image.src = this.canvas.toDataURL({format: 'png'});

        this.mrObjectModelList = this.canvas.getObjects().map((item:fabric.Object, index) => {
                const mrList: MrObjectModel = {
                    id: item.toObject().id,
                    angle: item.angle,
                    dataSetSeq: dataSetSeq,
                    name: Number(item.name),
                    objectCodeId: item.toObject().objectCodeId,
                    userId: 11,
                    width: item.getScaledWidth(),
                    height: item.getScaledHeight(),
                    x: item.getCenterPoint().x,
                    y: item.getCenterPoint().y,
                    objectSeq: item.toObject().id,
                    createDate: item.toObject().createDate

                };
                return mrList;
            }

        );
        console.log(this.mrObjectModelList);

        this.mrDataSetModel = this.canvas.getObjects().map((item) => {
            const mrDataSet: MrDataSetRequestModel = {
                id : 0,
                seq: dataSetSeq,
                testDate: new Date(),
                userId: 11,
                patientInfoId: 11,
                fishbowlCode: this.fishbowlCode,
                waterHeight: this.fishbowlCode,
                controlCount: 0,
                fishCount: this.canvas.getObjects().length,
                etcCount:this.canvas.getObjects().length,
                objectId: 0

            };
            return mrDataSet;
        })[0]

        console.log(this.mrDataSetModel);


        // 회차별 오브젝트 생성
        this.mindReaderControlService.postObject(this.mrObjectModelList)
            .subscribe({
                next: async (data) => {
                    if(data){
                        console.log(data);
                    }
                    else{
                        console.log('실패....^^');
                    }
                },
                error: (err: HttpErrorResponse) => this.alertService.openAlert(err.message)
                });

        // 회차별 DataSet 생성
        this.mindReaderControlService.postDataSet(this.mrDataSetModel)
            .subscribe({
                next: async(data) => {
                    if(data){
                        console.log(data);
                    }
                    else{
                        console.log('실패....^^');
                    }
                },
                error: (err: HttpErrorResponse) => this.alertService.openAlert(err.message)
            });


        this.canvas.clear();
        return image.src;
    }


}

