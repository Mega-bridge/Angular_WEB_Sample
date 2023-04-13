import {Component, ViewChild} from "@angular/core";
import {DragAndDropComponent} from "./drag-and-drop/drag-and-drop.component"

@Component({
    selector: 'app-dashboard-draw-fish-family',
    templateUrl: 'draw-fish-family.component.html',
    styleUrls: ['draw-fish-family.component.scss']
})

export class DrawFishFamilyComponent {

    public showWhales: boolean = false;
    public showFishes: boolean = false;
    public showSharks: boolean = false;
    public showEels: boolean = false;
    public showRoundFishes: boolean = false;
    public showEct: boolean = false;
    public showFishEct: boolean = false;

    public fishImg:string[] = ['../assets/img/fish.svg','../assets/img/fishSmile.svg'];
    public fishScalesImg:string[] = ['../assets/img/fish.svg','../assets/img/fishNonScales.png','../assets/img/fishSingleScales.png','../assets/img/fishDenseScales.png'];
    public whaleImg:string[] = ['../assets/img/whale.svg','../assets/img/whaleAngryWithWater.svg'];
    public sharkImg:string[] = ['../assets/img/shark.svg'];
    public eelImg:string[] = ['../assets/img/eel.svg'];
    public roundFishImg:string[] = ['../assets/img/roundFish.svg'];
    public ectImg:string[] = [];

    public waterPortImg: string[] = ['assets/img/originPort.png','assets/img/fishPortFullWater.png'];
    public selectWaterPort: string = ''

    public selectFish:string = '';
    public selectFishScale:string = '';

    public familyTypeList = [
        {
            label: "엄마",
            selected: true,
        },
        {
            label: "아빠",
            selected: false,
        },
        {
            label: "나",
            selected: false,
        }
    ];

    public selectedFamilyType: string ='엄마';


    @ViewChild('canvas', { static: false }) canvas !: DragAndDropComponent;

    constructor() {}

    combineSelectOption(img: string):void{
        var finalFish: string = '';



        if (this.selectFish.includes('Smile')){
            if(img.includes('Dense')){
                finalFish =  'fishSmileDenseScales';
                this.getImgPolaroid('../assets/img/'+finalFish+'.svg');
            }
        }

    }

    selectFishImg(event: any, select:string){
        this.selectFish = '';
        this.selectFishScale = '';
        this.selectFish = select;
    }
    selectFishScalesImg(event: any, select:string){
        this.selectFishScale = select;
        this.combineSelectOption(select);
    }

    public getImgPolaroid(event:any) {
        this.canvas.getImgPolaroid(event,this.selectedFamilyType);
    }

    public drawMode() {
        this.canvas.drawingMode();
    }

    public removeSelected() {
        this.canvas.removeSelected();
    }

    selectWater(opt: string) {
        this.selectWaterPort = opt;
        this.canvas.setWater(opt);
    }

    selectedChange(e:any){
        this.selectedFamilyType = this.familyTypeList[e].label;
    }

    public rasterize() {
        this.canvas.rasterize();
    }
}
