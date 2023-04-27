import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {MrFamilyCodeResponse} from "../../shared/model/response/mr-family-code.response.model";
import {Router} from "@angular/router";
import {MindReaderControlService} from "../../shared/service/mind-reader-control.service";
import {MrFamilyRelationCodeResponse} from "../../shared/model/response/mr-family-relation-code.response.model";
import {MrGenderCodeResponse} from "../../shared/model/response/mr-gender-code.response.model";
import {MrJobCodeResponse} from "../../shared/model/response/mr-job-code.response.model";

@Component({
    selector: 'app-input-info',
    templateUrl: 'input-info.component.html',
    styleUrls: ['input-info.component.scss']
})

export class InputInfoComponent implements OnInit{

    // 가족 리스트
    public familyTypeList : MrFamilyCodeResponse[] = [];

    public selectedFamilyType: number[] = [];
    // 선택한 가족 리스트
    public selectedFamily: any[]=[];
    // 가족 관계 리스트
    public familyRelation: MrFamilyRelationCodeResponse[] = []
    // 성별 리스트
    public genderList: MrGenderCodeResponse[] = [];
    // 직업 리스트
    public jobList: MrJobCodeResponse[] = [];

    /**
     * 생성자
     * @param mindReaderControlService
     * @param router
     */
    constructor(
        private mindReaderControlService:MindReaderControlService,
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
        // 가족 리스트 조회
        this.mindReaderControlService.getFamily()
            .subscribe({
                next: async (data) => {
                    if (data){
                        console.log(data);
                        this.familyTypeList = data;
                    }
                }
            });
        // 가족 관계 리스트 조회
        this.mindReaderControlService.getFamilyRelation()
            .subscribe({
                next: async (data) => {
                    if (data){
                        this.familyRelation = data;
                    }
                }
            });

        // 성별 리스트 조회
        this.mindReaderControlService.getGender()
            .subscribe({
                next: async (data) => {
                    if (data){
                        this.genderList = data;
                    }
                }
            });

        // 직업 리스트 조회
        this.mindReaderControlService.getJob()
            .subscribe({
                next: async (data) => {
                    if (data){
                        this.jobList = data;
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
    /**
     * 로그인 화면으로 이동
     */
    startLogin() {
        this.router.navigateByUrl(`/login`);

    }
}
