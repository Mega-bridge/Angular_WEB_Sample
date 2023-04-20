import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserResponseModel} from "../model/response/user.response.model";
import {UserRequest} from "../model/request/user.request.model";


@Injectable({
    providedIn: 'root'
})
export class UserService {

    public SEVER_URL = 'http://localhost:8080/user';

    /**
     * 생성자
     * @param http
     */
    constructor(private http: HttpClient) { }


    /**
     * 로그인 처리
     */
    signUp(request: UserRequest):Observable<UserResponseModel> {
        return this.http.post<UserResponseModel>(`${this.SEVER_URL}/`,request);
    }
}
