import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import {NotificationService} from "@progress/kendo-angular-notification";
import {FormControl, FormGroup} from "@angular/forms";
import {LoginRequestModel} from "../../shared/model/request/login.request.model";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertService} from "../../shared/service/alert.service";
import {LoginService} from "../../shared/service/login.service";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {

  // login form
  public registerForm: FormGroup = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(),
  });

  /**
   * @param router
   * @param loginService
   * @param notificationService
   * @param alertService
   */
  constructor(
    private router: Router,
    private loginService: LoginService,
    private notificationService: NotificationService,
    private alertService: AlertService
  ) {}

  /**
   * 초기화
   */
  ngOnInit() {

  }

  /**
   * 로그인
   */
  onLogin() {

    // 로그인 form
    const request: LoginRequestModel = {
      email: this.registerForm.controls['email'].value,
      password: this.registerForm.controls['password'].value

    }

    this.loginService.login(request)
        .subscribe({
            next: async (data) => {
              if (data) {
                this.router.navigateByUrl(`/dashboard`);
              }
            },

          // http error message 출력
          error: (err: HttpErrorResponse) => this.alertService.openAlert(err.message)
    })

  }

}
