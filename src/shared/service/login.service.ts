import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginRequestModel} from "../model/request/login.request.model";
import {LoginResultResponse} from "../model/response/login-result.response.model";


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    public SEVER_URL = 'http://localhost:8080/auth';

    /**
     * 생성자
     * @param http
     */
    constructor(private http: HttpClient) { }


    /**
     * 로그인 처리
     */
    login(request: LoginRequestModel):Observable<LoginResultResponse> {
        return this.http.post<LoginResultResponse>(`${this.SEVER_URL}/login`,request);
    }
}
