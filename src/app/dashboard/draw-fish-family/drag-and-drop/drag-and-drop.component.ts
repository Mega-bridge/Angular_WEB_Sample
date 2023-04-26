import {
    AfterViewInit,
    asNativeElements,
    Component,
    ElementRef,
    Injectable,
    Input,
    OnInit,
    ViewChild
} from "@angular/core";
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

    @Input() userEmail:string | null = '';

    public canvas: fabric.Canvas;

    /** 어항 코드 */
    public fishbowlCode: number = 0;

    /** 어항 물 높이 */
    public waterHeight: number = 0;

    /** event count */
    public controlCount: number = 0;

    /** fish count */
    public fishCount: number = 0;

    /** etc count */
    public etcCount: number = 0;

    /** object request data 생성 */
    public mrObjectModelList: MrObjectModel[] = [];

    /** object 삭제 데이터 포함 */
    public allMrObjectModelList: MrObjectModel[] = [];

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

            this.controlCount += 1;
            console.log('control Count: ' + this.controlCount);
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
                name:familyType ? familyType : null,

            });
            this.extend(image, this.randomId(), new Date().getTime(),objectCodeId);
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
        let data:any;
        const activeGroup = this.canvas.getActiveObjects();
        if (activeGroup) {
            data = activeGroup.map((item:fabric.Object, index) => {
                const mrList: MrObjectModel = {
                    angle: item.angle,
                    dataSetSeq: 1,
                    name: item.name != null ? Number(item.name) : null,
                    objectCodeId: item.toObject().objectCodeId,
                    userEmail: this.userEmail ? this.userEmail : '',
                    width: item.getScaledWidth(),
                    height: item.getScaledHeight(),
                    x: item.getCenterPoint().x,
                    y: item.getCenterPoint().y,
                    objectSeq: item.toObject().id,
                    createDate: item.toObject().createDate,
                };
                return mrList;
            })
            this.allMrObjectModelList.push(data[0]);
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
    extend(obj:any, id:any, createDate: number,objectCodeId:any) {
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


    /**
     * canvas 저장
     * @param dataSetSeq
     */
    rasterize(dataSetSeq: any) {

        // cavas img로 저장
        const image = new Image();
        image.src = this.canvas.toDataURL({format: 'png'});

        // 회차별 dataSet 생성
        this.createDataSet(dataSetSeq, image.src);

        this.canvas.clear();
        return image.src;
    }

    /**
     * 회차 별 object 생성
     * @param dataSetSeq
     */
    createObjectSet(dataSetSeq: number):void {
        // 회차별 오브젝트 생성 request model
        this.mrObjectModelList = this.canvas.getObjects().map((item:fabric.Object, index) => {
                const mrList: MrObjectModel = {
                    angle: item.angle,
                    dataSetSeq: dataSetSeq,
                    name: item.name != null ? Number(item.name) : null,
                    objectCodeId: item.toObject().objectCodeId,
                    userEmail: this.userEmail? this.userEmail : '' ,
                    width: item.getScaledWidth(),
                    height: item.getScaledHeight(),
                    x: item.getCenterPoint().x,
                    y: item.getCenterPoint().y,
                    objectSeq: item.toObject().id,
                    createDate: item.toObject().createDate,
                };
                return mrList;
            }

        );
        // 삭제 데이터 + 캔버스 최종 데이터
        for (let i=0;i<this.mrObjectModelList.length;i++){
            this.allMrObjectModelList.push(this.mrObjectModelList[i]);
        }
        // objectSeq 순으로 정렬
        this.allMrObjectModelList.sort((a, b) => a.objectSeq - b.objectSeq);
        console.log('삭제 오브젝트 포함 데이터 : ')
        console.log(this.allMrObjectModelList)
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
    }


    /**
     * 회차 별 dataSet 생성
     * @param dataSetSeq
     * @param src
     */
    async createDataSet(dataSetSeq: number, src?:any) {
        // canvas 내 objectCodeId List
        const objectCodeList = this.canvas.getObjects().map(item => item.toObject().objectCodeId);

        // Object code 구하기
        await this.getObjectCode(0, objectCodeList);
        await this.getObjectCode(1, objectCodeList);
        await this.getObjectCode(2, objectCodeList);

        // 회차별 데이터셋 생성 request model
        this.mrDataSetModel = {
            seq: dataSetSeq,
            testDate: new Date().getTime(),
            userEmail: this.userEmail? this.userEmail : '',
            patientInfoId: null,
            fishbowlCode: this.fishbowlCode,
            waterHeight: this.waterHeight,
            actionCount: this.controlCount,
            fishCount: this.fishCount,
            etcCount:this.etcCount,
            resultSheetId: 0,
            resultImage: src,
            deleted: false
        };

        console.log(this.mrDataSetModel);



        // 회차별 DataSet 생성
        this.mindReaderControlService.postDataSet(this.mrDataSetModel)
            .subscribe({
                next: async(data) => {
                    if(data){
                        console.log(data);
                        // 데이터셋 저장 성공 시 오브젝트 정보 저장
                        // 회차별 오브젝트 생성
                        this.createObjectSet(dataSetSeq);
                    }
                    else{
                        console.log('실패....^^');
                    }
                },
                error: (err: HttpErrorResponse) => this.alertService.openAlert(err.message)
            });
    }


    /**
     * water height code & 물고기 객체 수 & etc 객체 수 구하기
     * @param type
     * @param objectCodeList
     */
    getObjectCode(type:number, objectCodeList:number[]) {
        return new Promise((resolve,reject) => {
            this.mindReaderControlService.getObjectCode(type)
                .subscribe({
                    next: (data) => {
                        if(data){
                            // 물고기
                            if(type == 0) {
                                const fishList = data.map(item => item.id);
                                objectCodeList.map(item => fishList.includes(item)? this.fishCount++ : this.fishCount);
                                console.log('fish: ' + this.fishCount);
                                return;
                            }
                            // 어항
                            else if(type == 1) {
                                this.waterHeight = data.filter(item => item.id == this.fishbowlCode)[0].waterHeight;
                                return;
                            }
                            // etc
                            else{
                                const etcList = data.map(item => item.id);
                                objectCodeList.map(item => etcList.includes(item)? this.etcCount++ : this.etcCount);
                                console.log('etc: ' + this.etcCount);
                                return;
                            }
                        }
                    },
                    complete: () => {
                        resolve("done");
                    }

                });

        });
    }


}

