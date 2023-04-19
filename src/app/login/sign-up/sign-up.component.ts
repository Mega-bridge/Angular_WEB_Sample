import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-sign-up',
    templateUrl: 'sign-up.component.html',
    styleUrls: ['sign-up.component.scss']
})

export class SignUpComponent {
    /**
     * @param router
     */
    constructor(
        private router: Router
    ) {}

    /**
     * 회원가입 폼
     */
    public signUpForm: FormGroup = new FormGroup({
        email: new FormControl(""),
        name: new FormControl(""),
        password: new FormControl(""),
        confirmPassword: new FormControl("")
    });

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
