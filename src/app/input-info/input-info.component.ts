import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {MrFamilyCodeResponse} from "../../shared/model/response/mr-family-code.response.model";
import {Router} from "@angular/router";
import {MindReaderControlService} from "../../shared/service/mind-reader-control.service";
import {MrFamilyRelationCodeResponse} from "../../shared/model/response/mr-family-relation-code.response.model";
import {MrGenderCodeResponse} from "../../shared/model/response/mr-gender-code.response.model";
import {MrJobCodeResponse} from "../../shared/model/response/mr-job-code.response.model";
import {PatientInfoRequest} from "../../shared/model/request/patient-info.request.model";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertService} from "../../shared/service/alert.service";

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
    public familyRelation: MrFamilyRelationCodeResponse[] = [];
    // 성별 리스트
    public genderList: MrGenderCodeResponse[] = [];
    // 직업 리스트
    public jobList: MrJobCodeResponse[] = [];
    // 선택한 가족 리스트
    public selectedFamilyList: any[]=[];
    // 선택한 가족관게 리스트
    public selectedFamilyRelation: string[] = [];
    // 라디오 버튼 선택 저장
    public selectedValues: string[] = [];

    /**
     * 생성자
     * @param mindReaderControlService
     * @param router
     */
    constructor(
        private mindReaderControlService:MindReaderControlService,
        private router: Router,
        private alertService: AlertService,

    ) {
    }

    // input form
    public infoForm: FormGroup = new FormGroup({
        userEmail: new FormControl(''),
        userName: new FormControl(''),
        age: new FormControl(),
        familyNum: new FormControl(),
        jobCode: new FormControl(),
        genderCode: new FormControl(),
    });

    ngOnInit() {
        // 가족 리스트 조회
        this.mindReaderControlService.getFamily()
            .subscribe({
                next: async (data) => {
                    if (data){
                        console.log(data);
                        this.familyTypeList  = data
                    }
                }
            });
        // 가족 관계 리스트 조회
        this.mindReaderControlService.getFamilyRelation()
            .subscribe({
                next: async (data) => {
                    if (data){
                        this.familyRelation  = data
                    }
                }
            });

        // 성별 리스트 조회
        this.mindReaderControlService.getGender()
            .subscribe({
                next: async (data) => {
                    if (data){
                        this.genderList=data
                    }
                }
            });

        // 직업 리스트 조회
        this.mindReaderControlService.getJob()
            .subscribe({
                next: async (data) => {
                    if (data){
                        this.jobList = data
                    }
                }
            });
    }

    /**
     * 추가 정보 기입하기
     */
    patientInfo(){
        this.familyInfo()
        let resultFamilyRelation=this.selectedFamilyRelation.join(',');
        let resultFamilyInfo=this.selectedFamilyList.join(',');

        const request: PatientInfoRequest = {
            id: 0,
            age: Number(this.infoForm.controls['age'].value),
            familyInfo: resultFamilyInfo,
            familyNum: Number(this.infoForm.controls['familyNum'].value),
            familyRelation: resultFamilyRelation,
            genderId: this.infoForm.controls['genderCode'].value.id,
            jobId: this.infoForm.controls['jobCode'].value.id,
            userEmail: this.infoForm.controls['userEmail'].value,
            userName: this.infoForm.controls['userName'].value,
        }
        console.log(request)
        // 내담자 추가 정보 생성
        this.mindReaderControlService.postPatientInfo(request)
            .subscribe({
                next: async (data) => {
                    if(data) {
                        console.log(data);
                        this.startLogin();
                    }
                },
                error: (err: HttpErrorResponse) => this.alertService.openAlert(err.message)
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

    updateSelectedValue(event:any){
        // if (event.target.checked) {
        //     this.radioValues.push(event);
        // } else {
        //     const index = this.radioValues.indexOf(event);
        //     if (index !== -1) {
        //         this.radioValues.splice(index, 1);
        //     }
        // }

    }

    /**
     * 가족 데이터
     */
    familyInfo(){
        this.selectedValues = this.selectedValues.filter(item => item !== null);
        this.selectedValues.forEach(item => {
            const splitted = item.split('_');
            this.selectedFamilyList.push(splitted[0]);
            this.selectedFamilyList.join(',');
            this.selectedFamilyRelation.push(splitted[1]);
        });
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
