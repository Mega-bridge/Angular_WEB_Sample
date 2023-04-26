import {NotificationService} from "@progress/kendo-angular-notification";
import {Injectable} from "@angular/core";

type HorizontalPosition = "left" | "center" | "right";
type VerticalPosition = "top" | "bottom";

/**
 * alert service
 */
@Injectable({
    providedIn: 'root'
})
export class AlertService {
    public horizontal: HorizontalPosition = "center";
    public vertical: VerticalPosition = "top";

    /**
     * @param notificationService
     */
    constructor(
        private notificationService: NotificationService
    ) {}

    // alert 창을 띄운다.
    openAlert(message: string) {
        this.notificationService.show({
            content: message,
            cssClass: 'alert-style',
            animation: { type: "fade", duration: 500 },
            type: { style: "info", icon: true },
            position: { horizontal: this.horizontal, vertical: this.vertical },
            width: 800,
            height: 60,
            hideAfter: 2000,
        });
    }
}