import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private loginService : AuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        // 관리자
        if (route.data && route.data["roles"] && this.loginService.isAuthenticated()){
            let roles = route.data["roles"] as string;
            return roles[0] == this.loginService.getUserRole();
        }

        // 일반 사용자
        else{
            // 토큰 유효 기간 확인
            if (!this.loginService.isAuthenticated()) {
                this.loginService.removeSessionStorage();
                this.router.navigateByUrl('main');
                return false;
            }
            return true;
        }


    }
}
