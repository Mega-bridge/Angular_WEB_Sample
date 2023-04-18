import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: 'app-tutorial',
    templateUrl: 'tutorial.component.html'
})

export class TutorialComponent {
    /**
     * @param router
     */
    constructor(
        private router: Router
    ) {}


    /**
     * 정보기입 화면으로 이동
     */
    inputInfo() {

        this.router.navigateByUrl(`/input-info`);

    }

}
