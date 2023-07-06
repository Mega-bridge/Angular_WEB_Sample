import {
    AfterViewInit,
    asNativeElements,
    ViewContainerRef,
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
import {AuthService} from "../../../../shared/service/auth.service";
import { __values } from "tslib";
import { MrFamilyCodeResponse } from "src/shared/model/response/mr-family-code.response.model";
import {Align, PopupAnimation} from "@progress/kendo-angular-popup";
import {DialogService} from "@progress/kendo-angular-dialog";
import { ConfirmDialogComponent } from "src/shared/component/dialogs/confirm-dialog/confirm-dialog.component";


@Component({
    selector: 'app-dashboard-drag-and-drop',
    templateUrl: 'drag-and-drop.component.html',
    styleUrls: ['drag-and-drop.component.scss']
})

@Injectable({
    providedIn: 'root'
})

export class DragAndDropComponent implements OnInit,AfterViewInit{

    @ViewChild('htmlCanvas', {read: ElementRef})
    public htmlCanvasElement!: ElementRef;

    @Input() userEmail:string | null = '';


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

   

    /** canvas img URL */
    public url: string | ArrayBuffer = '';

    /** canvas size */
    public size: any = {
        width: 1000,
        height: 1000
    };

    /** canvas 사이즈 */
    public canvasWidth = window.innerHeight - 66;
    public canvasHeight = window.innerHeight - 66;

    /** 상담사 canvas 1000 x 1000 에서 scale된 정도 계산 */
    public canvasWidthScaled = 1000 / this.canvasWidth;
    public canvasHeightScaled = 1000 / this.canvasHeight;
    

    /** 어항 코드 */
    public fishbowlCode: number = 0;

     /** fish bowl img URL */
     public fishbowlUrl: string = '';

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

    /** 가족선택 열기 */
    public openFam: boolean = false;

    /** 컨트롤바 열기 */
    /** 각도 */
    public openAngleControl: boolean = false;
    /** 크기 */
    public openSizeControl: boolean = false;
    /** 좌우 반전 */
    public flipXControl: boolean = false;
    /** 상하 반전 */
    public flipYControl: boolean = false;

    // 컨드롤바 event handler
    public controlEventHandler: ((event: Event) => void) | null = null;

    /** object 선택 여부 */
    public isSelected: boolean = false;
    public isEtcSelected: boolean = false;
    /** event 사용 여부 */
    public hasEvent: boolean = false;
    
    
    /** 보조 설명 없애기 위한,,, 첫번째 물고기 추가 여부 확인 */
    public isSelectFirstFish : boolean = false;

    /** object 추가 순서 */
    public objectSeq: number = 0;

    /** 가족관계 리스트 */
    public familyTypeList : MrFamilyCodeResponse[] = [];
    /** 선택된 가족 관계 */
    public selectedFamilyType : any;

    /** 가족 선택 default item */
    public defaultItem: { description: string; id: any } = {
        description: "가족관계를 선택해주세요..",
        id: null,
    };

    /** 선태된 object 물고기 여부 */
    public isFishObject: boolean = false;
    /** table object canvas 포함 여부 */
    public isInTable : boolean = false;
    /** handle object canvas 포함 여부 */
    public isInHandle: boolean = false;
    public center :any;

    /** 팝업 위치 */
    public anchorAlign: Align = { horizontal: "left", vertical: "bottom" };
    public popupAlign: Align = { horizontal: "left", vertical: "top" };


    /** 다이얼로그 생성 */
    @ViewChild('dialog', {read: ViewContainerRef})
    public dialogRef!: ViewContainerRef;

    /**
     *
     * @param mindReaderControlService
     * @param alertService
     */
    constructor(
        public mindReaderControlService: MindReaderControlService,
        private alertService: AlertService,
        private authService: AuthService,
        private dialogService: DialogService,
    ) {
        this.canvas = new fabric.Canvas('canvas');
    }

    ngOnInit(): void {
        // 가족 리스트 가져오기
        this.mindReaderControlService.getFamily()
            .subscribe({
                next: async (data) => {
                    if (data){
                        this.familyTypeList = data;
                    }
                }
            });
            
    }

    ngAfterViewInit(): void {
        // setup front side canvas
        this.canvas = new fabric.Canvas(this.htmlCanvasElement.nativeElement, {
            hoverCursor: 'pointer',
            selection: true,
            selectionBorderColor: 'blue',
            isDrawingMode: false,
            backgroundColor:''

        });
        this.canvas.setWidth(this.canvasWidth);
        this.canvas.setHeight(this.canvasHeight);        
        
        
        /**
         * 화면 크기가 바뀔 경우 
         * size 재설정
         */
        window.addEventListener('resize', () => {

            this.canvasWidth = window.innerHeight - 66;
            this.canvasHeight = window.innerHeight -66;
        
            /** 상담사 canvas 1000 x 1000 에서 scale된 정도 계산 */
            this.canvasWidthScaled = 1000 / this.canvasWidth;
            this.canvasHeightScaled = 1000 / this.canvasHeight;

            this.canvas.setWidth(this.canvasWidth);
            this.canvas.setHeight(this.canvasHeight);   
            this.canvas.renderAll();
        
        });


        
        /**
         * 선택된 object가 없을 경우
         */
        this.canvas.on('selection:cleared', e =>{
            this.isSelected = false;
            this.isEtcSelected = false;
            this.openFam = false;
            this.hasEvent = false;

            this.closeOpenControl();
        })
        
        

        /**
         * object가 선택된 경우
         */
        this.canvas.on('selection:created',e => {
            console.log(e);
            console.log(e.selected);
            


            // 다중선택 확인 후 선택 취소 처리
            if (this.canvas.getActiveObjects().length > 1) {
                this.canvas.discardActiveObject();
            }
            else if(e.selected){
                // this.isSelected = true;
                const selectedObject = e.selected[0];
                this.center = e.selected[0].getCenterPoint();
                console.log(this.center);

                

                this.isFishObject = selectedObject.toObject().isFish;
                this.selectedFamilyType = selectedObject.name || Number(selectedObject.name) == 0 ? this.familyTypeList[Number(selectedObject.name)] : null;

                // conttrol바 위치 지정
                if(e.selected[0].top && e.selected[0].left && e.selected[0].hasControls){
                    this.isSelected = true;
                    this.isEtcSelected = false;
                    
                    var controlBar: HTMLDivElement | null = document.querySelector('#control-wrap');
                        
                    controlBar?.setAttribute("style", "top: " + e.selected[0].top +"px; left: " + e.selected[0].getCenterPoint().x + "px;");
                }
                else if(e.selected[0].top && e.selected[0].left){
                    this.isSelected = false;
                    this.isEtcSelected = true;
                    var deleteBtn: HTMLDivElement | null = document.querySelector('#delete-btn');
                    
                    deleteBtn?.setAttribute("style", "top: " + (e.selected[0].top - 40) +"px; left: " + (e.selected[0].left - 10) + "px;");
                }
            
            }

        });
        /**
         * 선택된 object가 변경된 경우
         */
        this.canvas.on('selection:updated',e => {

            this.closeOpenControl();

            // 다중선택 확인 후 선택 취소 처리
            if (this.canvas.getActiveObjects().length > 1) {
                this.canvas.discardActiveObject();
            }
            else if(e.selected){
                // this.isSelected = true;
                const selectedObject = e.selected[0];
                this.center = e.selected[0].getCenterPoint();
                this.isFishObject = selectedObject.toObject().isFish;

                this.selectedFamilyType = selectedObject.name || Number(selectedObject.name) == 0 ? this.familyTypeList[Number(selectedObject.name)] : null;

                // conttrol바 위치 지정
                if(e.selected[0].top && e.selected[0].left && e.selected[0].hasControls){
                    this.isSelected = true;
                    this.isEtcSelected = false;
                    // e.selected[0].hasControls ? this.hasEvent = true : this.hasEvent = false;
                    var controlBar: HTMLDivElement | null = document.querySelector('#control-wrap');
                        
                    controlBar?.setAttribute("style", "top: " + e.selected[0].top +"px; left: " + e.selected[0].getCenterPoint().x + "px;");
                }
                else if(e.selected[0].top && e.selected[0].left){
                    this.isSelected = false;
                    this.isEtcSelected = true;
                    var deleteBtn: HTMLDivElement | null = document.querySelector('#delete-btn');
                    
                    deleteBtn?.setAttribute("style", "top: " + (e.selected[0].top - 40) +"px; left: " + (e.selected[0].left - 10) + "px;");
                }
            
            }

        });

        // 위치 좌표값
        this.canvas.on('object:moving', e => {
            //console.log(e);
            const movedObject: any = e.target;
            var centerPoint = movedObject.getCenterPoint();
            console.log('////////Object Moving///////////////');
            console.log(movedObject);
            // console.log('centerPoint (X, Y): ' + centerPoint);
            
            console.log('centerPoint (X, Y): ' + movedObject);
            console.log('-----------------------');


            // conttrol바 위치 지정
            if(e.target){
                this.center = e.target.getCenterPoint();
                if(e.target.top && e.target.left){
                console.log(e.target.top);
                var controlBar: HTMLDivElement | null = document.querySelector('#control-wrap');
                    
                controlBar?.setAttribute("style", "top: " + e.target.top +"px; left: " + e.target.getCenterPoint().x + "px;");
                
                }
            }


        });

        // 각도값
        this.canvas.on('object:rotating', e => {
            const movedObject: any = e.target;
            // console.log('////////Object Rotating///////////////');
            console.log('angle: ' + movedObject.angle);
            console.log('angle: ' + movedObject.left);
            console.log('angle: ' + movedObject.top);
            console.log('angle: ' + movedObject.getCenterPoint());
            // console.log('-----------------------');
            
            

            // conttrol바 위치 지정
            if(e.target){
                this.center = e.target.getCenterPoint();
                if(e.target.top && e.target.left){
                console.log(e.target.top);
                var controlBar: HTMLDivElement | null = document.querySelector('#control-wrap');
                    
                controlBar?.setAttribute("style", "top: " + e.target.top +"px; left: " + e.target.getCenterPoint().x + "px;");
                }
            }

            this.updateControls();
        })


        // 상하좌우 대칭 여부
        this.canvas.on('object:modified', e => {
            //console.log(e);
            const modifiedObject = e.target;
            console.log('////////Object Modified///////////////');
            console.log('좌우 반전 여부:' + modifiedObject?.flipX);
            console.log('상하 반전 여부:' + modifiedObject?.flipY);
            console.log('Object Width:' + modifiedObject?.getScaledWidth());
            console.log(typeof(modifiedObject?.getScaledWidth()));
            console.log('Object Height:' + modifiedObject?.getScaledHeight());
            console.log('Object scale:' + modifiedObject?.scaleX);

            this.controlCount += 1;
            // console.log('control Count: ' + this.controlCount);
            

            if(e.target){
                this.center = e.target.getCenterPoint();
                if(e.target.top && e.target.left){
                console.log(e.target.top);
                var controlBar: HTMLDivElement | null = document.querySelector('#control-wrap');
                    
                controlBar?.setAttribute("style", "top: " + e.target.top +"px; left: " + e.target.getCenterPoint().x + "px;");
                }
            }

            this.updateControls();
            
        });



    }


    /**
     * 가족관계 선택/변경   
     * @param e 
     */

    selectFamily(e:any){
        var activeGroup = this.canvas.getActiveObject();
        
        activeGroup?.set('name',e.id).setCoords();
        this.selectedFamilyType = e;
    }


    /**
     * 가족 관계 선택
     * @param e
     */
    selectFamilyType(e:any){
        console.log(e);
        this.openFam = !this.openFam;
        var activeGroup = this.canvas.getActiveObject();
        
        activeGroup?.set('name',e.id).setCoords();
        this.selectedFamilyType = e;

        // if (e.length != 0){
        //     // this.familyTypeList[e].selected = true;
        //     // 선택된 가족관계 id 할당
        //     // this.selectedFamilyType = this.familyTypeList[e].id;
        //     this.selectedFamilyType = this.familyTypeList[e];

        //     // 가족 관계를 선택해야 물고기 선택 가능
        //     // this.isFamilyAfterFish=true;
        // }
        // else {
        //     this.selectedFamilyType = null;
        //     // this.isFamilyAfterFish=false;
        // }


    }


   
    


    /**
     * object -> control bar value 전달
     */
    updateControls() {
        var activeGroup = this.canvas.getActiveObject();
        
        // 각도
        var angleInputElement : HTMLInputElement | null = document.querySelector('#angle-control');
        var angleVal = activeGroup?.angle?.toString();


        // 사이즈
        var scaleInputElement : HTMLInputElement | null = document.querySelector('#scale-control');
        var scaleVal = activeGroup?.scaleX?.toString();

        // left
        // var leftInputElement : HTMLInputElement | null = document.querySelector('#left-control');
        // var leftVal = activeGroup?.left?.toString();

        // top
        // var topInputElement : HTMLInputElement | null = document.querySelector('#top-control');
        // var topVal = activeGroup?.top?.toString();
        
        // 각도
        if(angleInputElement){    
            angleInputElement.value = angleVal ? angleVal: '0';
            console.log(angleVal);
            console.log(angleInputElement.value);
        }

        // 사이즈
        if(scaleInputElement){
            scaleInputElement.value = scaleVal ? scaleVal : '0.2';
        }

        // left
        // if(leftInputElement){
        //     leftInputElement.value = leftVal ? leftVal : '400';
        // }

        // top
        // if(topInputElement){
        //     topInputElement.value = topVal ? topVal : '400';
        // }
        
    }


    /**
     * 컨트롤 바
     * @param val 
     */
    changeControl(htmlId: string, type: string){
        
        var activeGroup = this.canvas.getActiveObject();
        
        if(activeGroup?.evented){
            
            if(htmlId){

                var control: HTMLInputElement | null = document.querySelector(htmlId);

                if (this.controlEventHandler) {
                    control?.removeEventListener('input', this.controlEventHandler);
                } 
    
                // 각도 크기
                if (control?.value) {
                    switch (type) {
                        case 'angle':
                            activeGroup.set('angle', parseInt(control.value, 10)).setCoords();
                            
                            var angleInRadians = fabric.util.degreesToRadians(Number(control.value));
                            var dx = this.center.x  - ((activeGroup.getScaledWidth() - 0) / 2) * Math.cos(angleInRadians);
                            var dy =  
                            angleInRadians == 0 ? this.center.y - ((activeGroup.getScaledHeight() - 0) / 2) 
                            : this.center.y - ((activeGroup.getScaledHeight() - 0) / 2) * Math.sin(angleInRadians);
                           
                            console.log(this.center);
                            console.log(dx);
                            console.log(dy);
                            if(activeGroup.left && activeGroup.top){
                                activeGroup.set('left', 
                            dx).setCoords();
                                activeGroup.set('top',
                                 dy).setCoords();
                            }
                            
                            
                            break;
                        case 'scale':
                            activeGroup.scale(parseFloat(control.value)).setCoords();
                            break;
                        default:
                            break;
    
                    }
                    
                }
                
            }

            // 상하 좌우 반전
            else {
                switch (type) {
                    case 'flipX':
                        this.flipXControl = !this.flipXControl;
                        activeGroup.set('flipX',this.flipXControl);
                        // activeGroup.set('left', parseInt(control.value, 10)).setCoords();
                        break;
                    case 'flipY':
                        this.flipYControl = !this.flipYControl;
                        // activeGroup.set('angle', parseInt(control.value, 10)).setCoords();
                        activeGroup.set('flipY',this.flipYControl);
                        // activeGroup.set('top', parseInt(control.value, 10)).setCoords();
                        break;
                    default:
                        break;

                }
                
            }

            this.canvas.requestRenderAll();
            this.canvas.renderAll();    
        }

    }



    /**
     * control 바 선택된 control slide open/close
     * @param type 
     */
    closeOpenControl(type ?:string):void {
        this.updateControls();

        this.openAngleControl = type === 'openAngleControl' ? !this.openAngleControl : false;
        this.openSizeControl = type === 'openSizeControl' ? !this.openSizeControl : false;
        // this.flipXControl = type === 'flipXControl' ? !this.flipXControl : false;
        // this.flipYControl = type === 'flipYControl' ? !this.flipYControl : false;


        
    }
   

    /**
     * 어항 설정
     * @param opt
     * @param fishbowlCode
     */
    setWater(opt: string, fishbowlCode: number){
        this.fishbowlUrl = opt;
        this.fishbowlCode = fishbowlCode;
        this.canvas.setBackgroundImage(this.fishbowlUrl, this.canvas.renderAll.bind(this.canvas), {
            top: 275 / this.canvasHeightScaled,
            left: 15 / this.canvasWidthScaled,
            scaleX:0.42 /  this.canvasWidthScaled,
            scaleY: 0.42 / this.canvasHeightScaled
        });

    }

    /**
     * 선택된 object canvas에 추가
     * @param imgURL
     * @param familyType
     * @param objectCodeId
     */
    getImgPolaroid(imgURL: any, objectCodeId: any) {
        // imgURL = 'assets/img/whale/웃는고래_물.png';
       
        const imageElement = document.createElement('img');
        const image = new fabric.Image(imageElement);

        fabric.Image.fromURL(imgURL, (img) => {
            image.setElement(img.getElement());
            image.set({
                left:this.canvasWidth / 2,
                top: this.canvasHeight / 2,
                angle: 0,
                padding: 10,
                borderColor: 'green',
                cornerColor: 'green',
                cornerSize: 10,
                transparentCorners: false,
                hasRotatingPoint: objectCodeId == 75 || objectCodeId == 76 ? false : true,
                hasControls : objectCodeId == 75 || objectCodeId == 76 ? false : true,
                selectable: true,
                evented: objectCodeId == 75 || objectCodeId == 76 ? true : true,
                
                

            });
            this.extend(image, this.randomId(), new Date().getTime(),objectCodeId,imgURL.includes('/F_'));
            
            image.scale(0.2);
            
            

            if(objectCodeId == 76){
                this.isInTable = true;
                image.scale(1);
                image.scaleX = 0.42 / this.canvasWidthScaled;
                image.scaleY = 0.42 / this.canvasHeightScaled;
                image.top = this.canvasHeight - image.getScaledHeight();
                image.left = 15 / this.canvasWidthScaled;
                image.lockMovementX = true;
                image.lockMovementY = true;
                
                image.name = 'table';
                

                this.canvas.add(image);
                this.canvas.discardActiveObject().renderAll();
                this.canvas.setActiveObject(image);
                this.canvas.sendToBack(image);

            }
            else if(objectCodeId == 75){
                this.isInHandle = true;
                image.scale(1);
                image.scaleX = 0.42 / this.canvasWidthScaled;
                image.scaleY = 0.42 / this.canvasHeightScaled;
                image.top = 555 / this.canvasHeightScaled;
                image.left = 15 / this.canvasWidthScaled;
                image.lockMovementX = true;
                image.lockMovementY = true;

                image.name = 'handle';

                this.canvas.add(image);
                this.canvas.discardActiveObject().renderAll();
                this.canvas.setActiveObject(image);
                this.canvas.sendToBack(image);
            }
            else{
                this.canvas.add(image);
                this.canvas.discardActiveObject().renderAll();
                this.canvas.setActiveObject(image);
                this.canvas.bringToFront(image);
            }


            
            // 첫번째 객체 선택 여부 확인
            this.canvas.getObjects().length > 1 ? this.isSelectFirstFish = false : this.isSelectFirstFish = true; 
            

            
            // this.selectItemAfterAdded(image);
          });
        
        
    }


    /**
     * 선택된 object 삭제
     */
    removeSelected(object?: any) {
        let data:any;
        const activeObject = this.canvas.getActiveObject();
        console.log(activeObject);
        if (activeObject) {
            const mrList: MrObjectModel = {
                angle: activeObject.angle,
                dataSetSeq: 1,
                name: activeObject.name != null ? Number(activeObject.name) : null,
                objectCodeId: activeObject.toObject().objectCodeId,
                userEmail: this.userEmail ? this.userEmail : '',
                width: activeObject.getScaledWidth(),
                height: activeObject.getScaledHeight(),
                x: activeObject.getCenterPoint().x,
                y: activeObject.getCenterPoint().y,
                objectSeq: activeObject.toObject().id,
                createDate: activeObject.toObject().createDate,
                flip: activeObject.flipX
            };
            
            this.allMrObjectModelList.push(mrList);
            this.canvas.discardActiveObject();
            this.canvas.remove(activeObject);
            // const self = this;
            // activeGroup.forEach((object:fabric.Object) => {
            //     self.canvas.remove(object);
            // });
        }
    }


    /**
     * object에 id 프로퍼티 추가
     * @param obj
     * @param id
     * @param createDate
     * @param objectCodeId
     */
    extend(obj:any, id:any, createDate: number,objectCodeId:any, isFish: boolean) {
        obj.toObject = ((toObject) => {
            return function() {
                return fabric.util.object.extend(toObject.call(obj), {
                    id,
                    objectCodeId,
                    createDate,
                    isFish
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


    /**
     * canvas 저장
     * @param dataSetSeq
     * @param startDate
     * @param detailFishId
     */
    rasterize(dataSetSeq: any, startDate: Date, detailFishId: number, patientInfoId:number) {

            // cavas img로 저장
            const image = new Image();
            image.src = this.canvas.toDataURL({format: 'png'});

            // 가족관계 누락된 물고기 확인
            const itemNameList = this.canvas.getObjects().filter(item => item.toObject().isFish && (!item.name && item.name != '0') ).map(item => item.name);
            
            if(itemNameList.length > 0){
                this.checkFamilyTypeDialog();
            }
            else{
                // 회차별 dataSet 생성
                this.createDataSet(dataSetSeq, startDate, detailFishId, patientInfoId,image.src);
            }
            
    }




    /**
     * 회차 별 dataSet 생성
     * @param dataSetSeq
     * @param startDate
     * @param detailFishId
     * @param src
     */
    async createDataSet(dataSetSeq: number, startDate:Date,detailFishId: number,patientInfoId:number ,src?:any) {
        // canvas 내 objectCodeId List
        const objectCodeList = this.canvas.getObjects().map(item => item.toObject().objectCodeId);


        // Object code 구하기
        await this.getObjectCode(0, objectCodeList);
        await this.getObjectCode(1, objectCodeList);
        await this.getObjectCode(2, objectCodeList);

        const endDate = new Date();

        // 회차별 데이터셋 생성 request model
        this.mrDataSetModel = {
            seq: dataSetSeq,
            testDate: startDate.getTime(),
            userEmail: this.userEmail? this.userEmail : '',
            patientInfoId: patientInfoId,
            fishbowlCode: this.fishbowlCode,
            waterHeight: this.waterHeight,
            actionCount: this.controlCount,
            fishCount: this.fishCount,
            etcCount:this.etcCount,
            resultImage: src,
            detailFishId: detailFishId,
            deleted: false,
            totalTime: endDate.getTime() - startDate.getTime()
        };

        console.log(this.mrDataSetModel);



        // 회차별 DataSet 생성
        this.mindReaderControlService.postDataSet(this.mrDataSetModel)
            .subscribe({
                next: async(data) => {
                    if(data){
                        // DataSet 생성 성공 시 회차별 오브젝트 생성
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


    /**
     * 회차 별 object 생성
     * @param dataSetSeq
     */
    createObjectSet(dataSetSeq: number):void {
        console.log(dataSetSeq);
        // 회차별 오브젝트 생성 request model
        this.mrObjectModelList = this.canvas.getObjects().map((item:fabric.Object, index) => {
                const mrList: MrObjectModel = {
                    angle: item.angle,
                    dataSetSeq: dataSetSeq,
                    name: item.name != null ? Number(item.name) : null,
                    objectCodeId: item.toObject().objectCodeId,
                    userEmail: this.userEmail? this.userEmail : '' ,
                    width:  item.getScaledWidth() * this.canvasWidthScaled,
                    height: item.getScaledHeight() * this.canvasHeightScaled,
                    x: item.getCenterPoint().x * this.canvasWidthScaled,
                    y: item.getCenterPoint().y * this.canvasHeightScaled,
                    objectSeq: item.toObject().id,
                    createDate: item.toObject().createDate,
                    flip: item.flipX
                };
                return mrList;
            }

        );

        console.log(this.mrObjectModelList);
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
                        // 회차별 오브젝트 생성 성공 시 canvas 초기화
                        this.canvas.clear();

                        // 그리기 저장 후 종료 시 새로고침 실행
                        window.location.reload();
                    }
                    else{
                        console.log('실패....^^');
                    }
                },
                error: (err: HttpErrorResponse) => this.alertService.openAlert(err.message)
            });
    }



    drawingMode() {
        this.canvas.isDrawingMode = !this.canvas.isDrawingMode;
    }


    /**
     * canvas 물고기 가족 관계 누락 다이얼로그
     */
    public checkFamilyTypeDialog() {
        const dialog = this.dialogService.open({
            title: "물고기의 가족관계가 누락되었습니다.",
            content: ConfirmDialogComponent,
            appendTo: this.dialogRef,
            width: 450,
            height: 200,
            minWidth: 250,
            
        });
        dialog.content.instance.text = '물고기의 가족관계가 누락되었습니다.<br>가족관계를 선택해주세요.';


        // 저장 실행
        dialog.result.subscribe((result: any) => {
            if (result.text === 'yes') {
                // 물고기 행동 정보 선택
                
            }

        });
    }

    /**
     * 테이블, 손잡이 제거
     * @param type 
     */
    deleteTableHandle(type: string) {
        type == 'handle' ? this.isInHandle = false : this.isInTable = false;
        const object = this.canvas.getObjects().filter(item => item.name == type);
        this.removeSelected(object);
    }





}

