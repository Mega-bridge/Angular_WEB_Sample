import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';

import {LoginService} from "./login.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private loginService : LoginService, private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if(this.loginService.getToken() != null){
            // alert("로그인 성공 : " + info);
            return true;
        }
        // alert("로그인 실패 : " + info);
        this.router.navigateByUrl('login');
        return false;

        // // 토큰 유효 기간 확인
        // if (!this.loginService.isAuthenticated()) {
        //     console.log('invalid token!');
        //     this.router.navigateByUrl('login');
        //     return false;
        // }
        // return true;
    }
}
