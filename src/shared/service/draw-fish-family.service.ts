import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DrawFishFamilyService {

    private missionAnnouncedSource = new Subject<string>();
    private missionConfirmedSource = new Subject<string>();

    private subject = new Subject<any>();
    subject$ = this.subject.asObservable();

    sendData(data: any){
        this.subject.next(data);
        console.log("sendData() data: ", data);
    }

    // getData(){
    //    this.subject.next()
    // }

    missionAnnounced$ = this.missionAnnouncedSource.asObservable();
    missionConfirmed$ = this.missionAnnouncedSource.asObservable();

    announceMission(mission: string){
        this.missionAnnouncedSource.next(mission);
    }

    confirmMission(astronaut: string){
        this.missionConfirmedSource.next(astronaut);
    }
}
