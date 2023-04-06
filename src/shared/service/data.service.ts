import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserResponseModel} from "../model/response/user.response.model";

/**
 * json-server data provider
 */

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public JSONURL = 'http://localhost:3000';

  /**
   * 생성자
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * 포스트 정보 불러오기
   */
  getData(): Observable<any> {
    return this.http.get(`${this.JSONURL}/posts`);
  }

  /**
   * 사용자 정보 불러오기
   */
  getUserData():Observable<UserResponseModel[]> {
    return this.http.get<UserResponseModel[]>(`${this.JSONURL}/users`);
  }
}
