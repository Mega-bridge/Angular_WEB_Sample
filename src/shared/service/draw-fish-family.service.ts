import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DrawFishFamilyService {

    private selectItem = new Subject<any>();
    private selectItemIndex = new Subject<number>();
    private seqItems = new Subject<any>();
    private deleteItem = new Subject<boolean>();
    private saveItem = new Subject<boolean>();
    private start = new Subject<boolean>();

    seqItems$ = this.seqItems.asObservable();
    selectItem$ = this.selectItem.asObservable();
    selectItemIndex$ = this.selectItemIndex.asObservable();
    deleteItem$ = this.deleteItem.asObservable();
    saveItem$ = this.saveItem.asObservable();
    start$ = this.start.asObservable();

    sendData(data: any){
        this.seqItems.next(data);
        console.log("sendData() data: ", data);
    }

    // getData(){
    //    this.subject.next()
    // }


    openFullScreen(){
        this.start.next(true);
    }

    closeFullScreen(){
        this.start.next(false);
    }

    selectSeqItem(item: any, index: number){
        this.selectItem.next(item);
        this.selectItemIndex.next(index);
    }

    deleteSeqItem(){
        this.deleteItem.next(true);
    }

    saveSeqItem(){
        this.saveItem.next(true);
    }


    getSelectSeqItem(){
        return this.selectItem;
    }
    getSelectSeqItemIndex(){
        return this.selectItemIndex;
    }

}
