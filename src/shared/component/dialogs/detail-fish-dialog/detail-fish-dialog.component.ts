import { Component } from "@angular/core";
import {DialogRef} from "@progress/kendo-angular-dialog";
import { MindReaderControlService } from "src/shared/service/mind-reader-control.service"; 
import { MrDetailFishResponseModel } from "src/shared/model/response/mr-detail-fish.response.model"; 

@Component({
    selector: 'app-dashboard-detail-fish-dialog',
    templateUrl: './detail-fish-dialog.component.html',
    styleUrls: ['detail-fish-dialog.component.scss']
})

export class DetailFishDialogComponent {
    public detailFishList: MrDetailFishResponseModel[] = [];
    public selectedValue:any;

    public text: string = '';

    /**
     *
     * @param dialogRef
     * @param mindReaderControlService
     */
  constructor(
    private dialogRef: DialogRef,
    private mindReaderControlService:MindReaderControlService
    ) {
        this.mindReaderControlService.getDetailFish()
            .subscribe({
                next: async (data) => {
                    if (data){
                        this.detailFishList = data;
                        this.selectedValue = this.detailFishList[0];
                        console.log(this.selectedValue);
                    }
                }
            })
    }
    
    /**
     * 어항 상세정보 변경
     * @param e 
     */
    changeValue(e:any){
        this.selectedValue = e;
    }

    /**
     * * 다이얼로그 닫기
     * */
    public closeDialog(): void {
        this.dialogRef.close({text: 'No'});
    }

    /**
     * 수행
     */
    public submit(): void {
       this.dialogRef.close({text: 'yes', detailFishId: this.selectedValue.id});
    }


    

}