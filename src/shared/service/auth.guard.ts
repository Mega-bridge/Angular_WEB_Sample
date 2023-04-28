import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';

import {LoginService} from "./login.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private session : LoginService, private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if(sessionStorage.getItem('userJWT') != null){
            // alert("로그인 성공 : " + info);
            return true;
        }
        // alert("로그인 실패 : " + info);
        this.router.navigateByUrl('login');
        return false;
    }
}
