import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DrawFishFamilyService {

    /* 모든 회차 정보 (삭제된 회차 제외) */
    private seqItems = new Subject<any>();
    seqItems$ = this.seqItems.asObservable();

    /* 선택된 회차 정보 */
    private selectItem = new Subject<any>();
    selectItem$ = this.selectItem.asObservable();

    /* 선택된 회차 index */
    private selectItemIndex = new Subject<number>();
    selectItemIndex$ = this.selectItemIndex.asObservable();

    /* 환자 정보 */
    private patientInfo = new Subject<any>();
    patientInfo$ = this.patientInfo.asObservable();

    /* 회차 삭제 여부 */
    private deleteItem = new Subject<boolean>();
    deleteItem$ = this.deleteItem.asObservable();

    /* 회차 다운로드 여부 */
    private saveItem = new Subject<boolean>();
    saveItem$ = this.saveItem.asObservable();

    /* 그리기 모드 시작 여부 */
    private start = new Subject<boolean>();
    start$ = this.start.asObservable();

    /**
     * 회차 정보 공유
     * @param data
     */
    sendData(data: any){
        this.seqItems.next(data);
    }

    /**
     * 환자 정보 공유
     * @param data
     */
    sendPatientData(data:any){
        this.patientInfo.next(data);
    }


    /**
     * 그리기 모드 시작 여부 설정
     */
    openFullScreen(){
        this.start.next(true);
    }

    /**
     * 그리기 모드 종료 여부 설정
     */
    closeFullScreen(){
        this.start.next(false);
    }

    /**
     * 회차 선택 시 선택된 회차 정보 공유
     * @param item
     * @param index
     */
    selectSeqItem(item: any, index: number){
        this.selectItem.next(item);
        this.selectItemIndex.next(index);
    }

    /**
     * 회차 삭제 시 해당 회차 정보 공유
     */
    deleteSeqItem(){
        this.deleteItem.next(true);
    }

    /**
     * 회차 저장(다운로드) 시 해당 회차 정보 공유
     */
    saveSeqItem(){
        this.saveItem.next(true);
    }


}
