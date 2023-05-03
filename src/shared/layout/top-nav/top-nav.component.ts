import {Component, OnInit, Output, EventEmitter, ViewContainerRef, ViewChild} from '@angular/core';
import {ConfirmDialogComponent} from "../../component/dialogs/confirm-dialog/confirm-dialog.component";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "@progress/kendo-angular-dialog";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  /** login token 정보 */
  public loginToken:string|null = null;

  /**
   * 생성자
   * @param dialog
   * @param router
   * @param dialogService
   * @param loginService
   */
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private dialogService: DialogService,
    private loginService:AuthService,
  ) {}

  @Output() sideNavToggled = new EventEmitter<void>();

  /** 다이얼로그 생성 컨테이너 지정 */
  @ViewChild('dialog', {read: ViewContainerRef})
  public dialogRef!: ViewContainerRef;

  /**
   * 초기화
   */
  ngOnInit() {
    this.loginToken = this.loginService.getToken();
  }

  toggleSidebar() {
    this.sideNavToggled.emit();
  }

  /**
   * 로그아웃 컨펀 다이얼로그 이벤트
   */
  public openDialog(): void {
    const dialog = this.dialogService.open({
      title: "로그아웃하시겠습니까?",
      content: ConfirmDialogComponent,
      appendTo: this.dialogRef,
      width: 450,
      height: 185,
      minWidth: 250,
      cssClass: 'custom-css-class',
    });
    dialog.content.instance.text = `정말로 로그아웃하시겠습니까?`;

    dialog.result.subscribe((result: any) => {
      if (result.text === 'yes') {
        this.loginService.removeToken();
        // 페이지 새로고침
        window.location.reload();
      } else {
        console.log("close");
      }
    });
  }

  public openDialog2(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      viewContainerRef: this.dialogRef,
      position:{
        top: '50%',
        left: '50%',
      },
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  /**
   * 로그아웃 버튼 클릭시 로그인 페이지 이동 이벤트
   */
  loginPage() {
    this.router.navigate(['/login']);
  }


  /**
   * main 화면으로 이동
   */
  mainPage() {

    this.router.navigateByUrl(`/main`);

  }



}
