import {Component} from "@angular/core";
import {DialogRef} from "@progress/kendo-angular-dialog";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls:['confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  public mode: string = 'dark-1';

  public text: string = '';

  public useCanvasStatusInfo : boolean = false;
  public canvasStatusInfoList: string[] = [
      '모두 먹이를 먹으러 가고 있습니다.',
      '모두 놀러가고 있습니다.',
      '함께 수영을 합니다.',
      '모두 아무것도 하고 있지 않습니다.',
      '가족이 각자 자신의 일을 하고 있습니다.',
      '나만 아무것도 하지 않고 다른 가족들은 각자 자신의 일을 하고 있습니다.',
      '나를 제외한 다른 가족들은 함께 무엇인가를 하고 있습니다.',
      '해당사항 없음'
  ];
  public selectedValue = '모두 먹이를 먹으러 가고 있습니다.';

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
    this.dialogRef.close({text: 'yes'});
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

