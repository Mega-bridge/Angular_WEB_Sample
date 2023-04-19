import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})

export class LoginComponent {
    /**
     * @param router
     */
    constructor(
        private router: Router
    ) {}

    /**
     * 로그인 폼
     */
    public loginForm: FormGroup = new FormGroup({
        email: new FormControl(""),
        password: new FormControl(""),
    });

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
