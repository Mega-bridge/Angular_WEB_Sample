import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * json-server data provider
 */

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public OBJECT_IMG_URL = ' http://localhost:8080/mindReader/objectImage';

  /**
   * 생성자
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * 포스트 정보 불러오기
   */
  getData(): Observable<any> {
    console.log(this.http.get(`${this.OBJECT_IMG_URL}`));
    return this.http.get(`${this.OBJECT_IMG_URL}`);
  }

}
