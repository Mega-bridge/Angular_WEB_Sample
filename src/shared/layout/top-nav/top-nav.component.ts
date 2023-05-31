import {Component, OnInit, Output, EventEmitter, ViewContainerRef, ViewChild} from '@angular/core';
import {ConfirmDialogComponent} from "../../component/dialogs/confirm-dialog/confirm-dialog.component";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "@progress/kendo-angular-dialog";
import {AuthService} from "../../service/auth.service";
import {DrawFishFamilyService} from "../../service/draw-fish-family.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  public subscription: Subscription;
  public seqItems : {id?: number, seq?: number,text: string, date?: string, imgUr?: string, hour?: number,minute?: number,second?: number,detailFishDescription?:string}[] = [];

  public userName: string | null = this.authService.getUserName();

  public settings = [
    { text: "추가정보" },
    { text: "로그아웃" },
  ];

  /**
   * 생성자
   * @param dialog
   * @param router
   * @param dialogService
   * @param authService
   */
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private dialogService: DialogService,
    private authService:AuthService,
    private drawFishFamilyService: DrawFishFamilyService
  ) {
    this.subscription = drawFishFamilyService.subject$.subscribe(
      data => {
        this.seqItems = data;
        this.seqItems.splice(0,0,{text:'회차 추가'})
        console.log("this.seqItems");
        console.log(this.seqItems);
    })

  }


  @Output() sideNavToggled = new EventEmitter<void>();

  /** 다이얼로그 생성 컨테이너 지정 */
  @ViewChild('dialog', {read: ViewContainerRef})
  public dialogRef!: ViewContainerRef;


  /**
   * 초기화
   */
  ngOnInit() {
  }

  /**
   * login token 정보 확인
   */
  checkToken(){
    return  this.authService.getToken();
  }

  /**
   * login 사용자 역할 조회
   */
  checkRole(){
    return this.authService.getUserRole() == 'ROLE_ADMIN';
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
      height: 160,
      minWidth: 250,
      cssClass: 'custom-css-class',
    });
    dialog.content.instance.text = `정말로 로그아웃하시겠습니까?`;

    dialog.result.subscribe((result: any) => {
      if (result.text === 'yes') {
        this.authService.removeSessionStorage();
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
   * 로그아웃 버튼 클릭시 main 페이지 이동 이벤트
   */
  loginPage() {
    this.router.navigate(['/main']);
  }


  /**
   * main 화면으로 이동
   */
  mainPage() {
    this.router.navigateByUrl(`/DrawFishFamily`);
  }

  /**
   * 사용자 추가정보 기입 수정 페이지로 이동
   */
  modifyInfo(){
    this.router.navigateByUrl('/modify-input-info')
  }

  /**
   * 관리자 페이지 이동
   */
  adminPage(){
    this.router.navigateByUrl('/admin')
  }

  onItemClick(e:any){
    switch (e.text){
      case '추가정보':
        this.modifyInfo()
        break;
      case '로그아웃':
        this.openDialog()
        break;
      default:
        break;
    }
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }


}
