import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import { MatDialogRef } from '@angular/material/dialog';
import {DialogCloseResult, DialogRef, DialogService} from "@progress/kendo-angular-dialog";

@Component({
  selector: 'app-logout-confirm',
  templateUrl: './logout-confirm.component.html',
  styleUrls:['logout-confirm.component.scss']
})
export class LogoutConfirmComponent {
  public mode: string = 'dark-1';
  constructor(
    private dialogRef: DialogRef,
  ) {}

  /**
   * 다이얼로그를 닫는다.
   */
  public closeDialog(): void {
    this.dialogRef.close({text: 'No'});
  }

  /**
   * 로그아웃한다
   */
  public submit(): void {
    this.dialogRef.close({text: 'logout'});
  }


  // /**
  //  * 생성자
  //  * @param router
  //  * @param dialogRef
  //  */
  // constructor(
  //   private readonly router: Router,
  //   public dialogRef: MatDialogRef<LogoutConfirmComponent>,
  //   ) {}
  //
  // /**
  //  * 로그아웃 버튼 클릭시 로그인 페이지 이동 이벤트
  //  */
  // onLoggedout() {
  //   this.router.navigate(['/login']);
  //   this.dialogRef.close();
  // }
  //
  // /**
  //  * 다이얼로그 닫기
  //  */
  // close(){
  //   this.dialogRef.close();
  // }

}

