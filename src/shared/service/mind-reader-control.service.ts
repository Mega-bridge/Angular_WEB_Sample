import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MrFamilyCodeResponse} from "../model/response/mr-family-code.response.model";
import {MrObjectImageResponse} from "../model/response/mr-object-image.response.model";

@Injectable({
    providedIn: 'root'
})

export class MindReaderControlService {
    public MR_CONTROL_URL = 'http://localhost:8080/mindReader';

    /**
     * @param http
     */
    constructor(private http: HttpClient) {
    }


    /**
     * 가족 정보 list 불러오기
     */
    getFamily():Observable<MrFamilyCodeResponse[]> {
        return this.http.get<MrFamilyCodeResponse[]>(`${this.MR_CONTROL_URL}/family`);
    }

    /**
     * object 정보 불러오기
     */
    getObjectData(): Observable<MrObjectImageResponse[]> {
        return this.http.get<MrObjectImageResponse[]>(`${this.MR_CONTROL_URL}/objectImage`);
    }
}
