import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {FamilyService} from "../../shared/service/family.service";
import {MrFamilyCodeResponse} from "../../shared/model/response/mr-family-code.response.model";
import {Router} from "@angular/router";

@Component({
    selector: 'app-input-info',
    templateUrl: 'input-info.component.html',
    styleUrls: ['input-info.component.scss']
})

export class InputInfoComponent implements OnInit{

    // 가족관계 리스트
    public familyTypeList : MrFamilyCodeResponse[] = [];
    public selectedFamilyType: number[] = [];


    /**
     *
     * @param familyService
     * @param router
     */
    constructor(
        private familyService: FamilyService,
        private router: Router

    ) {
    }



    // input form
    public infoForm: FormGroup = new FormGroup({
        email: new FormControl(""),
        name: new FormControl(""),
        sex: new FormControl(0),
        age: new FormControl(0),
        job: new FormControl(0),
        familyNum: new FormControl(0),
        familyRelationCode: new FormControl(0),
    });


    ngOnInit() {
        this.familyService.getFamily()
            .subscribe({
                next: async (data) => {
                    if (data){
                        console.log(data);
                        this.familyTypeList = data;
                    }
                }
            });

    }


    /**
     * 선택된 가족 구성원 값 받아오기
     * @param event
     * @param selected
     */
    checkedFamilyType(event: any, selected: number){
        const index = this.selectedFamilyType.indexOf(selected);
        if (index !== -1) {
            this.selectedFamilyType.splice(index, 1);
        } else {
            this.selectedFamilyType.push(selected);
        }
    }


    /**
     * 캔버스 화면으로 이동
     */
    startDrawing() {

        this.router.navigateByUrl(`/DrawFishFamily`);

    }
}
