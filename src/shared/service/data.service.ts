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

  public JSON_URL = 'http://localhost:3000';

  /**
   * 생성자
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * 포스트 정보 불러오기
   */
  getData(): Observable<any> {
    return this.http.get(`${this.JSON_URL}/posts`);
  }

}
