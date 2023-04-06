import {Component, OnInit} from "@angular/core";
import {DataService} from "../../shared/service/data.service";

@Component({
  selector:'app-table',
  templateUrl:'table.component.html'
  }
)
export class TableComponent implements OnInit{
  public data: any; // API 에서 받아오는 데이터 객체

  /**
   *
   * @param dataService
   */
  constructor(
    private dataService: DataService
  ) {}

  /**
   * 초기화
   */
  ngOnInit():void {
    this.dataService.getData().subscribe(data => {
      this.data = data;
    })
  }


}
