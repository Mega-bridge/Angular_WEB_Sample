import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

/**
 * API Header Token 추가
 */
export class TokenService implements HttpInterceptor{

    constructor(
        private loginService: AuthService
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // token 미전송 url
        // http://localhost:8080/auth/login 로그인 API url
        // http://localhost:8080/user 회원 생성 API url
        // http://localhost:8080/user/userList 기존 회원 전체 로드 API url
        switch (req.url){
            case  environment.apiUrl + '/auth/login':
            case environment.apiUrl + '/user':
            case environment.apiUrl + '/user/userList':
                return next.handle(req);
            default:
                let token=req.clone({
                    setHeaders:{
                        Authorization: "Bearer "+this.loginService.getToken()
                    }
                });
                return next.handle(token);
        }

        // if( req.url === 'http://localhost:8080/auth/login' || req.url === 'http://localhost:8080/user' || req.url === 'http://localhost:8080/user/userList'){
        //     return next.handle(req);
        // }
        // // 모든 구독자에 token 적용
        // let token=req.clone({
        //     setHeaders:{
        //         Authorization: "Bearer "+this.loginService.getToken()
        //     }
        // });
        // return next.handle(token);

    }
}
