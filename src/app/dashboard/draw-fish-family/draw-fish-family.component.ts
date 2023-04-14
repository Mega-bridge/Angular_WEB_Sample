import {Component, ViewChild} from "@angular/core";
import {DragAndDropComponent} from "./drag-and-drop/drag-and-drop.component"

@Component({
    selector: 'app-dashboard-draw-fish-family',
    templateUrl: 'draw-fish-family.component.html',
    styleUrls: ['draw-fish-family.component.scss']
})

export class DrawFishFamilyComponent {


    // object 선택 팝업 확장 여부
    /** 고래 선택 */
    public showWhales: boolean = false;
    /** 일반 물고기 선택 */
    public showFishes: boolean = false;
    /** 상어 선택 */
    public showSharks: boolean = false;
    /** 장어 선택 */
    public showEels: boolean = false;
    /** 둥근 물고기 선택 */
    public showRoundFishes: boolean = false;
    /** 기타사항 선택 */
    public showEct: boolean = false;
    /** 물고기 외 선택 */
    public showFishEct: boolean = false;

    // object 이미지 경로 리스트
    /** 일반 물고기 표정 img list */
    public fishImg:string[] = ['../assets/img/fish.svg','../assets/img/fishSmile.svg'];
    /** 물고기 비늘 img list */
    public fishScalesImg:string[] = ['../assets/img/fish.svg','../assets/img/fishNonScales.png','../assets/img/fishSingleScales.png','../assets/img/fishDenseScales.png'];
    /** 고래 img list */
    public whaleImg:string[] = ['../assets/img/whale.svg','../assets/img/whaleAngryWithWater.svg'];
    /** 상어 img list */
    public sharkImg:string[] = ['../assets/img/shark.svg'];
    /** 장어 img list */
    public eelImg:string[] = ['../assets/img/eel.svg'];
    /** 둥근 물고기 img list */
    public roundFishImg:string[] = ['../assets/img/roundFish.svg'];
    /** 물고기 외 img list */
    public ectImg:string[] = [];
    /** 어항 물 양 img list */
    public waterPortImg: string[] = ['assets/img/originPort.png','assets/img/fishPortFullWater.png'];

    // 선태된 object
    /** 어항 선택 */
    public selectWaterPort: string = '';
    /** 물고기 표정 선택 */
    public selectFish:string = '';
    /** 물고기 비늘 선택 */
    public selectFishScale:string = '';

    /** 선택된 가족 관계 */
    public selectedFamilyType: number = 0;

    // 가족관계 리스트
    public familyTypeList = [
        {
            label: "엄마",
            selected: true,
            value: 0
        },
        {
            label: "아빠",
            selected: false,
            value: 1
        },
        {
            label: "나",
            selected: false,
            value: 2
        }
    ];



    @ViewChild('canvas', { static: false }) canvas !: DragAndDropComponent;

    /**
     * 생성자
     */
    constructor() {}



    /**
     * 어항 물 양 선택
     * @param opt
     */

    selectWater(opt: string) {
        this.selectWaterPort = opt;
        this.canvas.setWater(opt);
    }

    /**
     * 가족 관계 선택
     * @param e
     */
    selectFamilyType(e:any){
        this.selectedFamilyType = this.familyTypeList[e].value;
    }

    /**
     * 선택된 물고기 표정 + 비늘 합치기
     * @param img
     * @param type 물고기 종류
     */
    combineSelectOption(img: string, type: string):void{
        // 최종 선택된 물고기
        var finalFish: string = '';

        // 웃는 물고기
        if (this.selectFish.includes('Smile')){
            // 빼곡한 비늘
            if(img.includes('Dense')){
                finalFish =  type+'SmileDenseScales';
                this.getImgPolaroid('../assets/img/'+finalFish+'.svg');
            }
        }

    }

    /**
     * 물고기 선택
     * @param event
     * @param select
     */
    selectFishImg(event: any, select:string){
        this.selectFish = '';
        this.selectFishScale = '';
        this.selectFish = select;
    }

    /**
     * 물고기 비늘 선택
     * @param event
     * @param select
     * @param type 물고기 종류
     */
    selectFishScalesImg(event: any, select:string, type:string){
        this.selectFishScale = select;
        this.combineSelectOption(select,type);
    }

    /**
     * img canvas에 복제
     * @param event
     */
    public getImgPolaroid(event:any) {
        // combine이 완료되어 object의 경로로 값을 할당 받은 경우 (물고기에만 해당)
        if(typeof event === 'string'){
            this.canvas.getImgPolaroid(event,this.selectedFamilyType);
        }
        // combine 없이 object만 선택된 경우
        else{
            this.canvas.getImgPolaroid(event.srcElement.currentSrc,this.selectedFamilyType);
        }

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
     * canvas png로 다운로드
     */
    public rasterize() {
        this.canvas.rasterize();
    }


    isPopupVisible1 = false;
    isPopupVisible2 = false;
    isPopupVisible3 = false;
    isPopupVisible4 = false;

    showPopup1() {
        this.isPopupVisible1 = !this.isPopupVisible1 ;
        this.isPopupVisible2=false;
        this.isPopupVisible3=false;
        this.isPopupVisible4=false;
    }
    showPopup2(){
        this.isPopupVisible2 = !this.isPopupVisible2 ;
        this.isPopupVisible1=false;
        this.isPopupVisible3=false;
        this.isPopupVisible4=false;
    }
    showPopup3(){
        this.isPopupVisible3 = !this.isPopupVisible3 ;
        this.isPopupVisible1=false;
        this.isPopupVisible2=false;
        this.isPopupVisible4=false;
    }
    showPopup4(){
        this.isPopupVisible4 = !this.isPopupVisible4 ;
        this.isPopupVisible1=false;
        this.isPopupVisible2=false;
        this.isPopupVisible3=false;
    }
}
