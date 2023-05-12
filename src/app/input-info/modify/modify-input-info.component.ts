import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {MrFamilyCodeResponse} from "../../../shared/model/response/mr-family-code.response.model";
import {Router} from "@angular/router";
import {MindReaderControlService} from "../../../shared/service/mind-reader-control.service";
import {MrFamilyRelationCodeResponse} from "../../../shared/model/response/mr-family-relation-code.response.model";
import {MrGenderCodeResponse} from "../../../shared/model/response/mr-gender-code.response.model";
import {MrJobCodeResponse} from "../../../shared/model/response/mr-job-code.response.model";
import {PatientInfoRequest} from "../../../shared/model/request/patient-info.request.model";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertService} from "../../../shared/service/alert.service";
import {AuthService} from "../../../shared/service/auth.service";
import {MrPatientInfoResponse} from "../../../shared/model/response/mr-patient-info.response.model";

@Component({
    selector: 'app-modify-input-info',
    templateUrl: 'modify-input-info.component.html',
    styleUrls: ['modify-input-info.component.scss']
})

export class ModifyInputInfoComponent implements OnInit{

    // 가족 리스트
    public familyList : MrFamilyCodeResponse[] = [];
    // 가족 관계 리스트
    public familyRelation: MrFamilyRelationCodeResponse[] = [];
    // 성별 리스트
    public genderList: MrGenderCodeResponse[] = [];
    // 직업 리스트
    public jobList: MrJobCodeResponse[] = [];
    // 내담자 정보 조회
    public patientData: any;
    ////////////////////////////
    // 선택한 가족 관계
    public selectedFamily: any[]=[];

    public selectedFamilyList: any[]=[];
    // 선택한 가족관게 리스트
    public selectedFamilyRelation: string[] = [];
    // 라디오 버튼 선택 저장
    public selectedValues: string[] = [];

    // 선택된 gender
    public selectedGender = ''
    // 선택된 job
    public selectedJob = ''
    public resultInfo:any[]=[]

    public resultRelation:any[]=[];
    public test1:any[]=[];
    public resultIndex:number=0;
    /**
     * 생성자
     * @param mindReaderControlService
     * @param router
     * @param alertService
     * @param loginService
     */
    constructor(
        private mindReaderControlService:MindReaderControlService,
        private router: Router,
        private alertService: AlertService,
        private authService: AuthService

    ) {
    }

    // input form
    public infoForm: FormGroup = new FormGroup({
        userEmail: new FormControl(''), // 사용자 이메일
        userName: new FormControl(''), // 사용자 성명
        age: new FormControl(), // 나이
        familyNum: new FormControl(), // 가족 수
        jobId: new FormControl(), // 직업 코드
        genderId: new FormControl(), // 성별 코드
    });

    /**
     * 초기화
     */
    ngOnInit() {
        // 데이터 로드

        this.loadData();
        setTimeout(()=>{
            this.test();
        },1000);
    }

    /**
     * 데이터 로드
     */
    loadData(){
        // 가족 리스트 조회
        this.mindReaderControlService.getFamily()
            .subscribe({
                next: async (data) => {
                    if (data){
                        this.familyList  = data
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
                        this.genderList = data
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

        // 내담자 추가 정보 조회
        this.mindReaderControlService.getPatientInfo(String(this.authService.getUserEmail()))
            .subscribe({
                next: async (data) => {
                    if (data){
                        this.patientData=data
                        this.selectedGender=this.patientData.genderId;
                        this.selectedJob=this.patientData.jobId;
                        this.infoForm.patchValue({...data});
                    }
                }
            });


    }

    test(){
        console.log(this.patientData.familyRelation)
        console.log(this.test1)
        this.resultInfo  =this.patientData.familyInfo.split(',').map(Number)
        this.resultRelation  =this.patientData.familyRelation.split(',').map(Number)
        console.log(this.resultRelation)
        this.test1 = this.resultInfo.map((item, index) => `${item}_${this.resultRelation[index]}`);
        this.resultInfo  = this.resultInfo.reduce((acc, val) => {
            const index = parseInt(val) - 1; // 배열 인덱스는 0부터 시작하므로 1을 뺍니다.
            acc[index] = acc[index] ? acc[index] + 1 : 1; // 해당 인덱스의 값을 1 증가시킵니다.
            return acc;
        }, []);
        this.resultInfo=this.resultInfo.filter(item => item !== null)
        // 가족 선택 리스트
        this.selectedFamily=this.familyList.filter(option =>this.patientData.familyInfo.split(',').map(Number).includes(option.id))
       /* this.selectedValues=this.familyRelation.filter(option =>this.patientData.familyRelation.split(',').map(Number).includes(option.id))
            .map(option => option.description)*/
        console.log(this.test1)
    }
    /**
     * 가족 데이터
     */
    familyInfo(){
        //this.selectedValues = this.selectedValues.filter(item => item !== null);
        console.log(this.test1)
        this.test1.forEach(item => {
            const splitted = item.split('_');
            this.selectedFamilyList.push(splitted[0]);
            this.selectedFamilyList.join(',');
            this.selectedFamilyRelation.push(splitted[1]);
            this.selectedValues=this.selectedFamilyRelation
        });
        console.log(this.selectedFamily)  // 가족
        console.log(this.selectedFamilyRelation) //관계

    }

    /**
     * 추가 정보 수정하기
     */
    modifyPatientInfo(){
        this.familyInfo()
        console.log(this.selectedFamilyRelation)
        console.log(this.selectedValues)

        let resultFamilyRelation=this.selectedFamilyRelation.join(',');
        let resultFamilyInfo=this.selectedFamilyList.join(',');
       /* this.selectedFamilyList1=this.familyList.filter(option =>this.patientData.familyInfo.split(',').map(Number).includes(option.id))
            .map(option => option.description);*/
        const request: PatientInfoRequest = {
            id: this.patientData.id,
            age: Number(this.infoForm.controls['age'].value),
            familyInfo: resultFamilyInfo,
            familyNum: Number(this.infoForm.controls['familyNum'].value),
            familyRelation: resultFamilyRelation,
            genderId:this.infoForm.controls['genderId'].value,
            jobId: this.infoForm.controls['jobId'].value,
            userEmail: this.infoForm.controls['userEmail'].value,
            userName: this.infoForm.controls['userName'].value,
        }


        console.log(this.test1)
        console.log(this.resultInfo)
        console.log(resultFamilyRelation)
        this.test1=this.resultInfo
        console.log(request)


        // 내담자 추가 정보 수정하기
        this.mindReaderControlService.postPatientInfo(request)
            .subscribe({
                next: async (data) => {
                    if(data) {
                        this.startTutorial();
                    }
                },
                error: (err: HttpErrorResponse) => this.alertService.openAlert(err.message)
            });
    }

    /**
     * 라디오버튼 삭제 시 값 초기화
     */
    onValueChange(event: any,myValue:number[],i:any) {
        this.resultIndex=0;
        let index = myValue.slice(0, i + 1).reduce((acc, val) => acc + val, 0);
        this.test1[index+1]=null;
        this.test1=this.test1.filter((item) => item !== null)
    }

    /**
     * 튜토리얼 화면으로 이동
     */
    startTutorial() {
        this.router.navigateByUrl(`/tutorial`);

    }
    /**
     * 로그인 화면으로 이동
     */
    startLogin() {
        this.router.navigateByUrl(`/login`);

    }
}
