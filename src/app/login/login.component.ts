import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../shared/service/login.service";
import {LoginRequestModel} from "../../shared/model/request/login.request.model";
import {NotificationService} from "@progress/kendo-angular-notification";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertService} from "../../shared/service/alert.service";


@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})

export class LoginComponent {

    /**
     * 생성자
     * @param router
     * @param loginProvider
     * @param notificationService
     */
    constructor(
        private router: Router,
        private loginProvider: LoginService,
        private notificationService: NotificationService,
        private alertService: AlertService
    ) {}

    /**
     * 로그인 폼
     */
    public loginForm: FormGroup = new FormGroup({
        email: new FormControl('',[Validators.required]),
        password: new FormControl('',[Validators.required]),
    });

    /**
     * login
     */
    login(){
        const request: LoginRequestModel = {
            email: this.loginForm.controls['email'].value,
            password: this.loginForm.controls['password'].value
        }
        // login
        this.loginProvider.login(request)
            .subscribe({
                next: async (response) => {
                    if (response) {
                        this.tutorial();
                    }
                },
                // http error message 출력
                error: (err: HttpErrorResponse) => this.alertService.openAlert(err.message)
            })
    }

    /**
     * 튜토리얼 화면으로 이동
     */
    tutorial() {
        this.router.navigateByUrl(`/tutorial`);
    }

    /**
     * 회원가입 화면으로 이동
     */
    signup() {
        this.router.navigateByUrl(`/sign-up`);
    }

}
