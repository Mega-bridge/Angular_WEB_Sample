import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {LoginRequestModel} from "../model/request/login.request.model";
import {LoginResultResponse} from "../model/response/login-result.response.model";



@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public SEVER_URL = 'http://localhost:8080/auth';

    /** 로그인한 email */
    public userId: string= '';
    /** 로그인한 token 정보 */
    public TOKEN_NAME = 'userJWT';
    /** 로그인한 email 정보 */
    public USER_EMAIL = 'userEmail';
    /** 로그인한 사용자 role 정보 */
    public USER_ROLE = 'userRole';

    /**
     * 생성자
     * @param http
     */
    constructor(
        private http: HttpClient,
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
                    // 사용자 정보 저장
                    this.setToken(result.jwt);
                    this.setUserEmail(result.user.email);
                    this.setUserRole(result.user.role);
                    return result
                })
            );
    }

    /**
     * login한 사용자 역할 정보 저장
     * @param role
     */
    setUserRole(role: string) {
        sessionStorage.setItem(this.USER_ROLE, role);
    }

    /**
     * login한 사용자 역할 정보 조회
     */
    getUserRole() {
        return sessionStorage.getItem(this.USER_ROLE);
    }

    /**
     * login한 email 저장
     */
    setUserEmail(email: string){
        sessionStorage.setItem(this.USER_EMAIL,email);
    }

    /**
     * login한 email 조회
     */
    getUserEmail(){
        return sessionStorage.getItem(this.USER_EMAIL);
    }

    /**
     * token 정보 조회
     */
    getToken() {
        return sessionStorage.getItem(this.TOKEN_NAME);
    }

    /**
     * login한 사용자 token 정보 저장
     * @param token
     */
    setToken(token: string): void {
        sessionStorage.setItem(this.TOKEN_NAME, token);
    }

    /**
     * logout 시 저장되어 있는 세션 정보 삭제
     */
    removeSessionStorage(): void {
        sessionStorage.removeItem(this.TOKEN_NAME);
        sessionStorage.removeItem(this.USER_EMAIL);
        sessionStorage.removeItem(this.USER_ROLE);
    }


    // 토큰 유효성 검증
    isAuthenticated(): boolean {
        const token = sessionStorage.getItem(this.TOKEN_NAME);
        return token ? !this.tokenExpired(token) : false;
    }

    tokenExpired(token: string) {
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }


}
