import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})

/**
 * API Header Token 추가
 */
export class TokenService implements HttpInterceptor{

    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // 로그인 화면 시 token 미전송
        if(req.url.includes('/main') || req.url.includes('/login')){
            return next.handle(req);
        }

        // 모든 구독자에 token 적용
        let token=req.clone({
            setHeaders:{
                Authorization: "Bearer "+localStorage.getItem('userJWT')
            }
        });
        return next.handle(token);

    }
}
