import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {LoginRequestModel} from "../model/request/login.request.model";
import {LoginResultResponse} from "../model/response/login-result.response.model";
// import { JwtHelperService } from '@auth0/angular-jwt';




@Injectable({
    providedIn: 'root'
})
export class LoginService {

    public SEVER_URL = 'http://localhost:8080/auth';

    /** 로그인한 email */
    public userId: string= '';
    /** 로그인한 token 정보 */
    public TOKEN_NAME = 'userJWT';
    /** 로그인한 email 정보 */
    public USER_EMAIL = 'userEmail';

    /**
     * 생성자
     * @param http
     * @param jwtHelper
     */
    constructor(
        private http: HttpClient,
        // private jwtHelper: JwtHelperService
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
                    this.setToken(result.jwt);
                    this.setUserEmail(result.user.email);
                    return result
                })
            );
    }

    /**
     * login한 email 저장
     */
    setUserEmail(email: string){
        localStorage.setItem(this.USER_EMAIL,email);
    }

    /**
     * login한 email 가져오기
     */
    getUserEmail(){
        return localStorage.getItem(this.USER_EMAIL);
    }

    /**
     * token 정보 조회
     */
    getToken() {
        return localStorage.getItem(this.TOKEN_NAME);
    }

    /**
     * login한 사용자 token 정보 저장
     * @param token
     */
    setToken(token: string): void {
        localStorage.setItem(this.TOKEN_NAME, token);
    }

    /**
     * logout 시 저장되어 있는 세션 정보 삭제
     */
    removeToken(): void {
        localStorage.removeItem(this.TOKEN_NAME);
        localStorage.removeItem(this.USER_EMAIL);
    }


    // 토큰 유효성 검증
    // isAuthenticated(): boolean {
    //     const token = localStorage.getItem(this.TOKEN_NAME);
    //     return token ? !this.isTokenExpired(token) : false;
    // }


    // isTokenExpired(token: string) {
    //     return this.jwtHelper.isTokenExpired(token);
    // }



}
