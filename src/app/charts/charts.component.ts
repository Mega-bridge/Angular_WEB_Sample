import {Component, OnInit} from "@angular/core";

@Component({
    selector:'app-charts',
    templateUrl:'charts.component.html',
  }
)
export class ChartsComponent implements OnInit{
  // 그래프 데이터 생성
  public chartData: number[] = [1, 2, 3, 4, 5];

  ngOnInit() {
  }
}
