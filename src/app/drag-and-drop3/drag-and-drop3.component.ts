import {Component, ElementRef, ViewChild} from '@angular/core';
import {CanvasComponent} from "./canvas/canvas.component";
@Component({
        selector:'app-drag2',
        templateUrl:'drag-and-drop3.component.html',
        styleUrls:['./drag-and-drop3.component.scss']
    }
)

export class DragAndDrop3Component {
    isPopupVisible1 = false;
    isPopupVisible2 = false;
    isPopupVisible3 = false;

    showPopup1() {
        this.isPopupVisible1 = !this.isPopupVisible1 ;
        this.isPopupVisible2=false;
        this.isPopupVisible3=false;
    }
    showPopup2(){
        this.isPopupVisible2 = !this.isPopupVisible2 ;
        this.isPopupVisible1=false;
        this.isPopupVisible3=false;
    }
    showPopup3(){
        this.isPopupVisible3 = !this.isPopupVisible3 ;
        this.isPopupVisible1=false;
        this.isPopupVisible2=false;
    }

    @ViewChild('canvas', { static: false })  canvas!: CanvasComponent;

    // 이미지 추가
    public getImgPolaroid(event:any) {
        this.canvas.getImgPolaroid(event);
    }

    // 선택한 물고기 삭제
    public removeSelected() {
        this.canvas.removeSelected();
    }

    // 그리기 모드
    public drawMode() {
        this.canvas.drawingMode();
    }

    // 그리기 초기화
    public clear() {
        this.canvas.clear();
    }

    // 좌표값
    public getObject(){
        this.canvas.getObject();
    }

}
