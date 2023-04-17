import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MrObjectImageResponse} from "../model/response/mr-object-image.response.model";

/**
 * json-server data provider
 */

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public OBJECT_IMG_URL = 'http://localhost:8080/mindReader/objectImage';

  /**
   * 생성자
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * 포스트 정보 불러오기
   */
  getData(): Observable<MrObjectImageResponse[]> {
    return this.http.get<MrObjectImageResponse[]>(`${this.OBJECT_IMG_URL}`);
  }

}
