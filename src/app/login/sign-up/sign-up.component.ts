import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {AlertService} from "../../../shared/service/alert.service";
import {UserService} from "../../../shared/service/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {UserModel} from "../../../shared/model/user.model";
import { LoginRequestModel } from "src/shared/model/request/login.request.model";
import { AuthService } from "src/shared/service/auth.service";

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

    /** id 체크 여부 */
    public idCheck: boolean = true;

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
        private authService: AuthService,

    ) {}

    /**
     * 회원가입 폼
     */
    public signUpForm: FormGroup = new FormGroup({
        email: new FormControl(''), // email
        name: new FormControl(''), // 사용자 이름
        password: new FormControl(''), // 비밀번호
        confirmPassword: new FormControl(''), // 확인 비밀번호
    });

    ngOnInit() {
        // 데이터 로드
        this.dataLoad();
        }

    /**
     * 회원 data load
     */
    dataLoad(){
        // 모든 사용자 리스트 조회
        this.userProvider.getAllUser()
            .subscribe({
                next: async (data) => {
                    if (data){
                        console.log(data)
                        this.userData = data;
                    }
                }
            });
    }


    /**
     * 회원가입
     */
    signup(){
        // 입력한 비밀번호와 확인 비밀번호 일치한지 확인
        if (this.signUpForm.controls['password'].value!=this.signUpForm.controls['confirmPassword'].value){
            this.alertService.openAlert('비밀번호가 일치한 지 다시 확인해주세요.');
        }
        // 개인정보 수집 체크 여부
        else if(this.isInfoAgree==false){
            this.alertService.openAlert('개인정보 수집 및 이용에 동의하여 주십시오.');
        }
        else{
            const request: UserModel = {
                role: 'ROLE_USER',
                email: this.signUpForm.controls['email'].value,
                password: this.signUpForm.controls['password'].value,
                username: this.signUpForm.controls['name'].value,
            }
            console.log(request)
            // 회원가입
            this.userProvider.signUp(request)
                .subscribe({
                    next: async (response)=>{
                        if(response){
                            this.alertService.openAlert('회원가입이 완료되었습니다.');
                            
                            // 회원 가입후 로그인 실행
                            this.login();

                            const request: LoginRequestModel = {
                                email: this.signUpForm.controls['email'].value,
                                password: this.signUpForm.controls['password'].value
                            }
                            // login 실행
                            this.authService.login(request)
                                .subscribe({
                                    next: async (response) => {
                                        if (response) {
                                            if (this.authService.isAuthenticated()) {
                                                setTimeout(() => {
                                                    window.location.reload();
                                                }, 15);
                    
                                                // 로그인 성공 시 튜토리얼로 이동
                                                this.modifyInfo();
                                                
                                            }
                    
                                        }
                                    },
                                    // http error message 출력
                                    error: (err: HttpErrorResponse) => {
                                        if(err.status == 401){
                                            this.alertService.openAlert('존재하지 않는 아이디입니다.')
                                        }
                                        else if (err.status == 400){
                                            this.alertService.openAlert('비밀번호를 다시 한 번 확인해주세요.')
                                        }
                                        else {
                                            this.alertService.openAlert(err.message)
                                        }
                    
                    
                                    }
                                })
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

        let checkNum = 0;
        console.log(this.userData)
        for (let i = 0; i < this.userData.length; i++){
            if (this.signUpForm.controls['email'].value === this.userData[i].email) {
                this.alertService.openAlert('중복된 Email입니다. 다른 Email를 입력해주세요.');
                checkNum +=1;
                break;
            }
            else if(this.signUpForm.controls['email'].value.length <= 0) {
                this.alertService.openAlert('Email을 입력해주십시오.');
                break;
            }
             else if (checkNum==0){
                this.alertService.openAlert('사용 가능한 Email입니다.')
                this.idCheck = false;
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

    /**
   * 사용자 추가정보 기입 수정 페이지로 이동
   */
  modifyInfo(){
    this.router.navigateByUrl('/modify-input-info')
  }

}
