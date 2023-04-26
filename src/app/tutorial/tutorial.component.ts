import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {LoginService} from "../../shared/service/login.service";

@Component({
    selector: 'app-tutorial',
    templateUrl: 'tutorial.component.html'
})

export class TutorialComponent{
    /**
     * @param router
     */
    constructor(
        private router: Router,
        private loginProvider: LoginService,
    ) {}


    /**
     * 정보기입 화면으로 이동
     */
    inputInfo() {
        if (this.loginProvider.getUserId()==''){
            this.router.navigateByUrl(`/input-info`);
        }
        else{
            this.router.navigateByUrl(`/DrawFishFamily`);
        }


    }

}
