import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import {DataService} from "../../shared/service/data.service";
import {NotificationService} from "@progress/kendo-angular-notification";
import {UserResponseModel} from "../../shared/model/response/user.response.model";
import {FormControl, FormGroup} from "@angular/forms";

type HorizontalPosition = "left" | "center" | "right";
type VerticalPosition = "top" | "bottom";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  public loginData: UserResponseModel[] = [];

  public horizontal: HorizontalPosition = "center";
  public vertical: VerticalPosition = "top";

  selectedStyle = 'login-page-wrap';

  public registerForm: FormGroup = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(),
  });

  /**
   * @param router
   * @param dataService
   * @param notificationService
   */
  constructor(
    private router: Router,
    private dataService: DataService,
    private notificationService: NotificationService
  ) {}

  /**
   * 초기화
   */
  ngOnInit() {
    this.dataService.getUserData().subscribe(data => {
      this.loginData = data;
    })
  }

  /**
   * 로그인 시 대시보드로 이동 이벤트
   */
  onLogin() {
    for(let i=0;i<this.loginData.length;i++){
      if(this.loginData[i].email === this.registerForm.controls['email'].value ){

        if(this.loginData[i].password === this.registerForm.controls['password'].value){
          this.router.navigateByUrl(`/dashboard`);
          return
        }
        else{
          this.openAlert('비밀번호를 확인해주세요.');
          break;
        }
      }
      else{
        if(this.loginData.length-1==i){
          this.openAlert('존재하지 않는 Email입니다.');
          break;
        }
      }
    }
  }



  openAlert(message: string) {
    this.notificationService.show({
      content: message,
      cssClass: 'button-notification',
      animation: { type: "fade", duration: 500 },
      type: { style: "info", icon: true },
      position: { horizontal: this.horizontal, vertical: this.vertical },
      width: 500,
      height: 50,
      hideAfter: 2000,
    });
  }

}
