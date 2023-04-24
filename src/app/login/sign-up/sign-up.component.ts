import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {AlertService} from "../../../shared/service/alert.service";
import {UserService} from "../../../shared/service/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {UserModel} from "../../../shared/model/user.model";

@Component({
    selector: 'app-sign-up',
    templateUrl: 'sign-up.component.html',
    styleUrls: ['sign-up.component.scss']
})

export class SignUpComponent implements OnInit{

    /** 개인정보 수집 및 이용 여부 */
    public isInfoAgree: boolean = false;

    /** userData */
    public userData: any;

    public idCheck: boolean = false;

    /**
     * 생성자
     * @param router
     * @param alertService
     * @param userProvider
     */
    constructor(
        private router: Router,
        private alertService: AlertService,
        private userProvider :UserService,

    ) {}

    /**
     * 회원가입 폼
     */
    public signUpForm: FormGroup = new FormGroup({
        id: new FormControl(''),
        email: new FormControl(''),
        name: new FormControl(''),
        password: new FormControl(''),
        confirmPassword: new FormControl(''),
        createDate: new FormControl(new Date()),
        updateDate: new FormControl(new Date()),
        role: new FormControl('')
    });

    ngOnInit() {
        this.dataLoad();
    }

    /**
     * 회원 data load
     */
    dataLoad(){
        // 가족 리스트 조회
        this.userProvider.getAllUser()
            .subscribe({
                next: async (data) => {
                    if (data){
                        this.userData = data;
                    }
                }
            });
    }

    /**
     * 회원가입
     */
    signup(){
        if (this.signUpForm.controls['password'].value!=this.signUpForm.controls['confirmPassword'].value){
            this.alertService.openAlert('비밀번호가 일치한 지 다시 확인해주세요.');
        }
        else if(this.isInfoAgree==false){
            this.alertService.openAlert('개인정보 수집 및 이용에 동의하여 주십시오.');
        }
        else{
            const request: UserModel = {
                id: this.signUpForm.controls['id'].value,
                createDate: this.signUpForm.controls['createDate'].value,
                email: this.signUpForm.controls['email'].value,
                password: this.signUpForm.controls['password'].value,
                updateDate: this.signUpForm.controls['updateDate'].value,
                username: this.signUpForm.controls['name'].value,
                role: this.signUpForm.controls['role'].value
            }
            this.userProvider.signUp(request)
                .subscribe({
                    next: async (response)=>{
                        if(response){
                            this.alertService.openAlert('회원가입이 완료되었습니다.');
                            this.login();
                        }
                    },
                    // http error message 출력
                    error: (err: HttpErrorResponse) => this.alertService.openAlert(err.message)
                })
        }
    }

    /**
     * checkbox event
     */
    checkEvent(){
        this.isInfoAgree=!this.isInfoAgree;
    }

    /**
     * ID 중복확인 event
     */
    duplicationCheck() {
        for (let i = 0; i < this.userData.length; i++) {
            if (this.signUpForm.controls['email'].value === this.userData[i].email) {
                this.alertService.openAlert('중복된 Email입니다. 다른 Email를 입력해주세요.');
                break;
            }
            else if(this.signUpForm.controls['email'].value.length<=0) {
                this.alertService.openAlert('Email을 입력해주십시오.');
                break;
            }
            else{
                this.alertService.openAlert('사용 가능한 Email입니다.')
                this.idCheck = true;
                break;
            }
        }
    }

    /**
     * 정보기입 화면으로 이동
     */
    inputInfo() {
        this.router.navigateByUrl(`/input-info`);
    }

    /**
     * 로그인 화면으로 이동
     */
    login() {
        this.router.navigateByUrl(`/login`);
    }

}
