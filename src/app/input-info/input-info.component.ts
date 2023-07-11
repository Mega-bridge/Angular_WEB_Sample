import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {MrFamilyCodeResponse} from "../../shared/model/response/mr-family-code.response.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MindReaderControlService} from "../../shared/service/mind-reader-control.service";
import {MrFamilyRelationCodeResponse} from "../../shared/model/response/mr-family-relation-code.response.model";
import {MrGenderCodeResponse} from "../../shared/model/response/mr-gender-code.response.model";
import {MrJobCodeResponse} from "../../shared/model/response/mr-job-code.response.model";
import {PatientInfoRequest} from "../../shared/model/request/patient-info.request.model";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertService} from "../../shared/service/alert.service";
import {AuthService} from "../../shared/service/auth.service";

@Component({
    selector: 'app-input-info',
    templateUrl: 'input-info.component.html',
    styleUrls: ['input-info.component.scss']
})

export class InputInfoComponent implements OnInit{
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
    // 최종 가족 구성원
    public resultInfo:any[]=[]
    // 최종 가족 관계
    public resultRelation:any[]=[];
    // 가족 구성원 + 가족 관계 데이터
    public familyData:any[]=[];
    // 로그인 한 아이디
    public getId: string = '';
    // 사용자 아이디
    public userId: number = 0;
    // 가족 선택했는지 확인
    public familySelected: boolean = false;
    public userData:any;

    /** default item */
    public jobDefault:{id:number;code:string;description:string}={
        id:99,
        code:'',
        description:'직업/학년',
    }
    public genderDefault:{id:number;code:string;description:string}={
        id:99,
        code:'',
        description:'성별',
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
    public checkPath:any;

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
        private authService: AuthService,
        private route: ActivatedRoute
    ) {
    }

    /**
     * 초기화
     */
    ngOnInit() {
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
        this.mindReaderControlService.getPatientInfo(this.getId)
            .subscribe({
                next: async (data) => {
                    if (data){
                        this.patientData=data
                        this.selectedGender=this.patientData.genderId;
                        this.selectedJob=this.patientData.jobId;



                        // 가족 리스트 조회
                        this.mindReaderControlService.getFamily()
                            .subscribe({
                                next: async (data) => {
                                    if (data){
                                        this.familyList  = data
                                        if(this.patientData.familyInfo!=""){
                                            this.selectedFamily = this.patientData.familyInfo.split(',').map(Number)
                                            //this.selectedFamily = this.resultInfo.filter((value, index, array) => array.indexOf(value) === index);
                                            // 가족 선택 리스트
                                            this.selectedFamily = this.selectedFamily.map(id => {
                                                return this.familyList.find(item => item.id === id);
                                            });
                                        }else{
                                            this.selectedFamily=[];
                                        }
                                    }
                                }
                            });
                        // 가족 관계 리스트 조회
                        this.mindReaderControlService.getFamilyRelation()
                            .subscribe({
                                next: async (data) => {
                                    if (data){
                                        this.familyRelation  = data
                                        if(this.patientData.familyRelation!=""){
                                            this.resultRelation  =this.patientData.familyRelation.split(',').map(Number)
                                            // 가족 관계 리스트
                                            this.resultRelation = this.resultRelation.map(id => {
                                                return this.familyRelation.find(item => item.id === id);
                                            });
                                        }else{
                                            this.resultRelation=[];
                                        }
                                    }
                                }
                            });


                        this.infoForm.patchValue({...data});

                    }
                }
            });
    }

    /**
     * 가족 구성원 추가 이벤트
     */
    addFamily(){
        this.selectedFamily.push({
            "id": 999,
            "code": "",
            "description": ""
        })
        this.resultRelation.push(
            {
                "id": 999,
                "code": "",
                "description": ""
            }
        )
        this.familySelected = true;

        /*        this.resultInfo.push(1);
                this.familyData.push([]);*/
    }

    /**
     * 가족 구성원 삭제 이벤트
     */
    subFamily(){
        this.selectedFamily.pop()
        this.resultRelation.pop()
        this.familySelected = false;
    }
    /**
     * 가족 선택 이벤트
     */
    familySelect(){
        this.familySelected = false;
    }
    /**
     * 추가 정보 수정하기
     */
    modifyPatientInfo(){
        if(this.patientData!=undefined){
            this.userId=this.patientData.id
        }
        const selectedFamily = this.selectedFamily.map(i=>i.id).filter(id => id !== 999).toString();
        const selectFamilyRelation = this.resultRelation.map(i=>i.id).filter(id => id !== 999).toString();
        //this.familyInfo()
        /*        let resultFamilyRelation=this.selectedFamilyRelation.join(',');
                let resultFamilyInfo=this.selectedFamilyList.join(',');*/
        const request: PatientInfoRequest = {
            id: this.userId,
            age: Number(this.infoForm.controls['age'].value),
            familyInfo: selectedFamily,
            familyNum: Number(this.infoForm.controls['familyNum'].value),
            familyRelation: selectFamilyRelation,
            genderId:this.infoForm.controls['genderId'].value,
            jobId: this.infoForm.controls['jobId'].value,
            userEmail: this.infoForm.controls['userEmail'].value,
            userName: this.infoForm.controls['userName'].value,
        }
        this.familyData=this.resultInfo
        // 내담자 추가 정보 수정하기
        this.mindReaderControlService.postPatientInfo(request)
            .subscribe({
                next: async (data) => {
                    if(data) {
                        this.alertService.openAlert('수정되었습니다.');
                        this.startDrawFish();
                        this.userData=[];
                    }
                },
                error: (err: HttpErrorResponse) => this.alertService.openAlert(err.message)
            });
    }

    /**
     * 로그인 화면으로 이동
     */
    startDrawFish() {
        this.router.navigateByUrl(`/DrawFishFamily`);

    }
}
