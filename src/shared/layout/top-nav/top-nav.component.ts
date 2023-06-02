import {Component, OnInit, Output, EventEmitter, ViewContainerRef, ViewChild, OnDestroy} from '@angular/core';
import {ConfirmDialogComponent} from "../../component/dialogs/confirm-dialog/confirm-dialog.component";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "@progress/kendo-angular-dialog";
import {AuthService} from "../../service/auth.service";
import {DrawFishFamilyService} from "../../service/draw-fish-family.service";
import {Subscription} from "rxjs";
import {AlertService} from "../../service/alert.service";


@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit,OnDestroy {

  public subscription: Subscription;
  public subscription2: Subscription;
  public seqItems : {id?: number, seq?: number,text: string, date?: string, imgUr?: string, hour?: number,minute?: number,second?: number,detailFishDescription?:string}[] = [];
  public userName: string | null = this.authService.getUserName();

  public selectedItem:any ;
  public preSelectedItem:any ;
  public patientData:any;

  public selectSeqIndex : number  = 0;

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
    private alertService: AlertService,
    private drawFishFamilyService: DrawFishFamilyService
  ) {
    this.subscription = drawFishFamilyService.seqItems$.subscribe(
      data => {
        this.seqItems = data;
        this.seqItems.splice(0,0,{text:'회차 추가'})
        this.selectedItem = this.seqItems[this.seqItems.length -1];
        this.preSelectedItem = this.selectedItem;
        this.selectSeqIndex = this.seqItems.length -1;
        console.log(this.seqItems);
    })

    this.subscription2 = drawFishFamilyService.patientInfo$.subscribe(
        patientData => {
            this.patientData = patientData;
        }
    )

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
      }
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

  /**
   * 사용자 추가정보 / 로그아웃
   * @param e
   */
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


  /**
   * 그리기 모드 시작
   */
  openFullscreen() {
    this.drawFishFamilyService.openFullScreen();
  }


  /**
   * 회차 선택 이벤트
   * @param e
   */
  selectSeq(e : any){

    // 기존 회차 선택
    if(e.seq){
      this.selectedItem = e;
      this.preSelectedItem = e;

      this.seqItems.map((item, index) => {
        if(item.seq === e.seq) this.selectSeqIndex = index; return;
      });

      this.drawFishFamilyService.selectSeqItem(e, this.selectSeqIndex);
    }
    // 24회 상담 모두 소진한 후 회차 추가
    else if(this.seqItems.length >= 25){
      this.alertService.openAlert('상담은 24회차까지 진행됩니다.');
    }
    // 회차 추가
    else{
      this.selectedItem = e;
      this.selectSeqIndex = 0;
      this.drawFishFamilyService.selectSeqItem(e, this.selectSeqIndex);
    }

  }

  // public itemDisabled(itemArgs: { dataItem: any; index: number }) {
  //   console.log(this.seqItems);
  //   console.log(itemArgs);
  //   if(this.seqItems && this.seqItems.length >= 24){
  //     return itemArgs.index === 0;
  //   }
  //   return false;
  // }

  /**
   * 회차 삭제
   */
  deleteSeq(){
    this.drawFishFamilyService.deleteSeqItem();
  }

  /**
   * 회차 다운로드
   */
  saveSeq(){
    this.drawFishFamilyService.saveSeqItem();
  }

  /**
   * 구독 해제
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

}
