import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {LoginRequestModel} from "../model/request/login.request.model";
import {LoginResultResponse} from "../model/response/login-result.response.model";



@Injectable({
    providedIn: 'root'
})
export class LoginService {

    public SEVER_URL = 'http://localhost:8080/auth';

    /** 로그인한 email */
    public userId: string= '';

    /**
     * 생성자
     * @param http
     */
    constructor(
        private http: HttpClient
        ) { }


    /**
     * 로그인 처리
     */
    login(request: LoginRequestModel):Observable<LoginResultResponse> {
        this.userId=request.email;
        return this.http.post<LoginResultResponse>(`${this.SEVER_URL}/login`,request)
            .pipe(
                map((result) => {
                    console.log(result);
                    // 사용자 token 정보 저장
                    sessionStorage.setItem('userJWT',result.jwt);
                    sessionStorage.setItem('userEmail',result.user.email);
                    return result
                })
            );
    }

    /**
     * login한 email 가져오기
     */
    getUserId(){
        return this.userId;
    }

    /**
     * logout 시 저장되어 있는 세션 정보 삭제
     */
    logOut() {
        sessionStorage.removeItem('userJWT');
        sessionStorage.removeItem('userEmail');
    }


}
