import {Component, ElementRef, Inject, OnInit, TemplateRef, ViewChild, ViewContainerRef} from "@angular/core";
import {DragAndDropComponent} from "./drag-and-drop/drag-and-drop.component"
import {Align} from "@progress/kendo-angular-popup";
import {DOCUMENT} from "@angular/common";
import {MrFamilyCodeResponse} from "../../../shared/model/response/mr-family-code.response.model";
import {MrObjectImageResponse} from "../../../shared/model/response/mr-object-image.response.model";
import {MindReaderControlService} from "../../../shared/service/mind-reader-control.service";
import {single} from "rxjs";
import {DrawerPosition} from "@progress/kendo-angular-layout";
import {ConfirmDialogComponent} from "../../../shared/component/dialogs/confirm-dialog/confirm-dialog.component";
import {DialogService} from "@progress/kendo-angular-dialog";
import {Router} from "@angular/router";
import {LoginService} from "../../../shared/service/login.service";
import {UserService} from "../../../shared/service/user.service";

@Component({
    selector: 'app-dashboard-draw-fish-family',
    templateUrl: 'draw-fish-family.component.html',
    styleUrls: ['draw-fish-family.component.scss']
})

export class DrawFishFamilyComponent implements OnInit{

    /** user email */
    public userEmail: string = '';
    /** user Id */
    public userId: number = 0;

    /** 결과지 슬라이더 열기 */
    public expanded = false;
    /** 결과지 슬라이더 위치 */
    public position: DrawerPosition = "end";

    /** 결과지 슬라이더 mocks */
    public items = [
        {text:'결과지', icon: "k-i-arrow-seek-right", content:'수고하셨습니다! 어항 속 모습을 통해 해석된 당신의 심리는 아래와 같습니다.'}
    ];

    /** 회차 items */
    public seqItems = [
        {
            id: 0,
            text: "1회차",
            date: new Date().getFullYear().toString() + '.' + (new Date().getMonth() + 1).toString() + '.' + new Date().getDate().toString(),
            imgUrl: ''
        },
        // { id: 1, text: "2회차", date: new Date().getFullYear().toString() + '.' + new Date().getMonth().toString() + '.' + new Date().getDate().toString()},
    ];

    /** 회차 선택 */
    public selectedSeq: number = 0;

    /** object url */
    public objectData:MrObjectImageResponse[] = [];
    // object 선택 팝업 확장 여부
    /** 고래 선택 */
    public showWhales: boolean = false;
    /** 일반 물고기 선택 */
    public showFishes: boolean = false;
    /** 둥근 물고기 선택 */
    public showRoundFishes: boolean = false;
    /** 상어 선택 */
    public showSharks: boolean = false;
    /** 장어 선택 */
    public showEels: boolean = false;
    /** 기타사항 선택 */
    public showEtc: boolean = false;
    /** 물고기 외 선택 */
    public showFishEtc: boolean = false;
    /** 어항 선택 */
    public showFishBowl: boolean = false;

    // object 이미지 경로 리스트
    /** 어항 물 양 img list */
    public fishBowlImgList: string[] = [];

    /** 일반 물고기 img list */
    public generalImgList:string[] = [];
    /**  일반 물고기 표정 img list */
    public generalFaceImgList:string[] = [];
    /**  일반 물고기 비늘 img list */
    public generalBodyImgList:string[] = [];

    /** 둥근 물고기 img list */
    public roundImgList:string[] = [];
    /**  둥근 물고기 표정 img list */
    public roundFaceImgList:string[] = [];
    /**  둥근 물고기 비늘 img list */
    public roundBodyImgList:string[] = [];

    /** 고래 img list */
    public whaleImgList:string[] = [];
    /**  고래 표정 img list */
    public whaleFaceImgList:string[] = [];
    /**  고래 비늘 img list */
    public whaleBodyImgList:string[] = [];

    /** 상어 img list */
    public sharkImgList:string[] = []
    /**  상어 표정 img list */
    public sharkFaceImgList:string[] = [];
    /**  상어 비늘 img list */
    public sharkBodyImgList:string[] = [];


    /** 장어 img list */
    public eelImgList:string[] = [];
    /**  장어 표정 img list */
    public eelFaceImgList:string[] = [];
    /**  장어 비늘 img list */
    public eelBodyImgList:string[] = [];

    /** 물고기 외 img list */
    public etcImgList:string[] = [];


    // 선태된 object
    /** 어항 선택 */
    public selectedFishBowl: string =  '';
    /** 물고기 표정 선택 */
    public selectedFishFace:string = '';
    /** 물고기 비늘 선택 */
    public selectedFishBody:string = '';
    /** 물고기 외 선택 */
    public selectedEtc:string = '';


    /** 선택된 가족 관계 */
    public selectedFamilyType: number = 0;

    /** 선택한 가족 관계 list */
    public selectedFamilyList: string[] = [];
    public selectedObjectList: string[] = [];

    /** 가족 선택 Disabled 여부 **/
    public isDisabled: boolean = false;

    /** 결과 화면 보여주기 여부 **/
    public resultVisible: boolean =false;

    /** 가족 선택 전 물고기 이미지 선택 여부 **/
    public isFamilyAfterFish: boolean = false;

    /** 캔버스 팝업 여부 */
    public isPopupOpen: boolean = false;

    /** full screen element 담을 변수 */
    public elem: any;

    /** canvas에 그리기 완료한 img */
    public canvasImage: string = '';

    // 가족관계 리스트
    public familyTypeList : MrFamilyCodeResponse[] = [];

    public anchorAlign: Align = { horizontal: "right", vertical: "top" };
    public popupAlign: Align = { horizontal: "left", vertical: "top" };

    @ViewChild('canvas', { static: false }) canvas !: DragAndDropComponent;
    @ViewChild('canvas', { static: true }) canvas_el!: ElementRef<HTMLCanvasElement>;

    /** 다이얼로그 생성 컨테이너 지정 */
    @ViewChild('dialog', {read: ViewContainerRef})
    public dialogRef!: ViewContainerRef;

    /**
     *
     * @param document
     * @param mindReaderControlService
     * @param dialogService
     * @param router
     * @param loginProvider
     * @param userService
     */
    constructor(
        @Inject(DOCUMENT) private document: any,
        private mindReaderControlService:MindReaderControlService,
        private dialogService: DialogService,
        private router: Router,
        private loginProvider: LoginService,
        private userService:UserService


    ) {}

    ngOnInit() {
        // full screen element
        this.elem = document.documentElement;
        // full screen 일 때 esc 키 누르면 팝업 전 화면으로 돌아감
        document.addEventListener('fullscreenchange', () => {
            this.isPopupOpen = !!document.fullscreenElement;
        });

        // data load
        this.mindReaderControlService.getObjectData()
            .subscribe({
                next: async (data) => {
                    if (data) {
                        this.objectData = data;

                        // 일반 물고기 표정
                        this.generalFaceImgList = data.filter(item => item.path.includes('/general/') && item.path.includes('_0.svg')).map(item => item.path);
                        // 일반 물고기 비늘
                        this.generalBodyImgList = data.filter(item => item.path.includes('/general/') && item.path.includes('F_GE_GE_')).map(item => item.path);

                        // 둥근 물고기 표정
                        this.roundFaceImgList = data.filter(item => item.path.includes('/round/') && item.path.includes('_0.svg')).map(item => item.path);
                        // 둥근 물고기 비늘
                        this.roundBodyImgList = data.filter(item => item.path.includes('/round/') && item.path.includes('F_RO_GE_')).map(item => item.path);

                        // 고래 표정
                        this.whaleFaceImgList = data.filter(item => item.path.includes('/whale/') && item.path.includes('_0.svg')).map(item => item.path);
                        // 고래 비늘
                        this.whaleBodyImgList = data.filter(item => item.path.includes('/whale/') && item.path.includes('F_WH_GE_')).map(item => item.path);

                        // 상어 표정
                        this.sharkFaceImgList = data.filter(item => item.path.includes('/shark/') && item.path.includes('_0.svg')).map(item => item.path);
                        // 상어 비늘
                        this.sharkBodyImgList = data.filter(item => item.path.includes('/shark/') && item.path.includes('F_SH_GE_')).map(item => item.path);

                        // 장어 표정
                        this.eelFaceImgList = data.filter(item => item.path.includes('/eel/') && item.path.includes('_0.svg')).map(item => item.path);
                        // 장어 비늘
                        this.eelBodyImgList = data.filter(item => item.path.includes('/eel/') && item.path.includes('F_EE_GE_')).map(item => item.path);

                        // 물고기 외
                        this.etcImgList = data.filter(item => item.path.includes('/etc/')).map(item => item.path);
                        // 어항
                        this.fishBowlImgList = data.filter(item => item.path.includes('/fishBowl/')).map(item => item.path);

                    }
                },
            })

        // 가족 리스트 가져오기
        this.mindReaderControlService.getFamily()
            .subscribe({
                next: async (data) => {
                    if (data){
                        this.familyTypeList = data;
                    }
                }
            });


        // 사용자 정보 조회
        this.userEmail = this.loginProvider.getUserId();
        this.userService.getUserData(this.userEmail)
            .subscribe({
                next: async (data) => {
                    if(data){
                        this.userId = data.id;
                        console.log(data);
                    }
                }
            })


    }

    /**
     * Object PopUP 여부
     * @param type
     */
    closeOpenPopUp(type ?:string):void {
        this.showFishes = type === 'showFishes' ? !this.showFishes : false;
        this.showWhales = type === 'showWhales' ? !this.showWhales : false;
        this.showRoundFishes = type === 'showRoundFishes' ? !this.showRoundFishes : false;
        this.showSharks = type === 'showSharks' ? !this.showSharks : false;
        this.showEels = type === 'showEels' ? !this.showEels : false;
        this.showEtc = type === 'showEtc' ? !this.showEtc : false;
        this.showFishBowl = type === 'showFishBowl' ? !this.showFishBowl : false;

    }


    /**
     * 어항 선택
     * @param opt
     */

    selectWater(opt: string) {
        this.showFishBowl = false;
        this.selectedFishBowl = opt;

        const fishbowlCode = this.objectData.filter(item => item.path == opt ).map(item => item.objectCodeId);
        this.canvas.setWater(opt,fishbowlCode[0]);
    }

    /**
     * 가족 관계 선택
     * @param e
     */
    selectFamilyType(e:any){
        this.selectedFamilyType = this.familyTypeList[e].id;
        this.familyTypeList[e].selected = true;
        // 선택한 가족관계 리스트에 추가
        this.selectedObjectList.push(this.familyTypeList[e].description)
        // 가족 관계 선택 시 버튼 막기
        this.isDisabled=true;
        // 가족 관계를 선택해야 물고기 선택 가능
        this.isFamilyAfterFish=true;
    }

    /**
     * 물고기 표정 선택
     * @param event
     * @param faceImg
     * @param type
     */
    selectFishFace(event: any, faceImg:string, type: string){
        this.selectedFishFace = '';
        this.selectedFishBody = '';
        this.selectedFishFace = faceImg;

        var faceType: string = '';

        if(faceImg.includes('_SM_')){
            faceType = 'SM';
        }
        else if(faceImg.includes('_SA_')){
            faceType = 'SA';
        }
        else if(faceImg.includes('_SU_')){
            faceType = 'SU';
        }
        else if(faceImg.includes('_AN_')){
            faceType = 'AN';
        }
        else if(faceImg.includes('_GE_')){
            faceType = 'GE';
        }

        switch (type){
            case 'GE':
                this.generalBodyImgList = this.objectData.filter(item =>
                    item.path.includes('/general/') && item.path.includes(`F_GE_${faceType}_`))
                    .map(item => item.path);
                break;
            case 'RO':
                this.roundBodyImgList = this.objectData.filter(item =>
                    item.path.includes('/round/') && item.path.includes(`F_RO_${faceType}_`))
                    .map(item => item.path);
                break;
            case 'WH':
                this.whaleBodyImgList = this.objectData.filter(item =>
                    item.path.includes('/whale/') && item.path.includes(`F_WH_${faceType}_`))
                    .map(item => item.path);
                break;
            case 'SH':
                this.sharkBodyImgList = this.objectData.filter(item =>
                    item.path.includes('/shark/') && item.path.includes(`F_SH_${faceType}_`))
                    .map(item => item.path);
                break;
            case 'EE':
                this.eelBodyImgList = this.objectData.filter(item =>
                    item.path.includes('/eel/') && item.path.includes(`F_EE_${faceType}_`))
                    .map(item => item.path);
                break;
            default:
                break;
        }

    }

    /**
     * 물고기 비늘 선택
     * @param event
     * @param bodyImg
     * @param type 물고기 종류
     */
    selectFishBody(event: any, bodyImg:string){
        this.selectedFishBody = bodyImg;

        //  switch 걸러서 함수(각 폴더 별) 만들고
        // 각 폴더 별 분류 함수 짜고
        // this.combineSelectOption(bodyImg,type);
        this.getImgPolaroid(bodyImg);
        // 물고기 선택 후에 가족관계 disabled
        this.isFamilyAfterFish = false;
    }


    /**
     * 물고기 외 객체 선택
     * @param event
     * @param img
     */
    selectEtcObject(event:any, img: any):void {
        this.selectedEtc = img;
        this.selectedObjectList.push(img);

        // 물고기 외 object img url 전달
        this.getImgPolaroid(img);
    }

    /**
     * img canvas에 복제
     * @param img
     */
    public getImgPolaroid(img:string) {

        const objectCodeId = this.objectData.filter(item => item.path == img ).map(item => item.objectCodeId);

        this.canvas.getImgPolaroid(img,objectCodeId[0],this.selectedFamilyType);

        // 물고기 선택 후 버튼 해제
        this.familyTypeList[this.selectedFamilyType].selected=false;
        // 물고기 선택 후 가족 관계 Disabled True
        this.isDisabled=false;

        // popup에서 선택한 물고기 초기화
        this.selectedFishBody='';
        this.selectedFishFace='';
        this.selectedEtc = '';
        this.selectedFishBowl = '';

        // popUp 자동 닫힘
        this.closeOpenPopUp();

    }

    /**
     * 그리기 모드
     */
    public drawMode() {
        this.canvas.drawingMode();
    }

    /**
     * 선택된 object delete
     */
    public removeSelected() {
        this.canvas.removeSelected();
    }

    /**
     * canvas 저장하기
     */
    public rasterize() {
        const dialog = this.dialogService.open({
            title: "Please confirm",
            content: ConfirmDialogComponent,
            appendTo: this.dialogRef,
            width: 450,
            height: 200,
            minWidth: 250,
        });
        dialog.content.instance.text = '저장 시 수정이 불가합니다.<br>그리기를 끝내시겠습니까?';

        dialog.result.subscribe((result: any) => {
            if (result.text === 'yes') {
                this.seqItems[this.selectedSeq].imgUrl = this.canvas.rasterize(this.selectedSeq);
                this.canvasImage = this.seqItems[this.selectedSeq].imgUrl;


                // full screen 닫기
                this.closeFullscreen();
            }
        });



    }

    /**
     * canvas 다운로드
     */
    public canvasDownload(){
        const downloadLink = document.createElement('a');
        document.body.appendChild(downloadLink);
        downloadLink.href = this.canvasImage;
        downloadLink.download = this.seqItems[this.selectedSeq].date + '.png';
        downloadLink.click();

    }

    /**
     *  그리기 모드 시 full screen
     */
    openFullscreen() {
        this.isPopupOpen=true;

        if (this.elem.requestFullscreen) {
            this.elem.requestFullscreen();
        }if (this.elem.webkitRequestFullscreen) {
            /* Chrome, Safari and Opera */
            this.elem.webkitRequestFullscreen();
        }
    }

    /**
     * 그리기 모드 해제
     */
    closeFullscreen() {
        this.isPopupOpen=false;

        this.document.exitFullscreen();
        if (this.document.webkitExitFullscreen) {
            this.document.webkitExitFullscreen();
        }

    }

    /**
     * 결과지 사이드 닫기
     * @param e
     */
    onSelect(e: any){
        console.log(e);
        e.item.text === '결과지' ? this.expanded = !this.expanded : this.expanded;
    }

    /**
     * 회차 선택
     * @param item
     */
    selectSeq(item: any){
        this.selectedSeq = item.id;
        this.canvasImage = this.seqItems[this.selectedSeq].imgUrl;
    }


    /**
     * 회차 추가하기
     */
    addSeq(){
        console.log(this.seqItems.length);
        this.seqItems.push({
            id: this.seqItems.length,
            text: `${this.seqItems.length + 1}회차`,
            date: new Date().getFullYear().toString() + '.' + (new Date().getMonth() + 1).toString() + '.' + new Date().getDate().toString(),
            imgUrl: ''
        });
    }


    protected readonly single = single;
}
