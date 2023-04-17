import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MrFamilyCodeResponse} from "../model/response/mr-family-code.response.model";

@Injectable({
    providedIn: 'root'
})

export class FamilyService {
    public FAMILY_URL = 'http://localhost:8080/mindReader/family';

    /**
     * @param http
     */
    constructor(private http: HttpClient) {
    }


    /**
     * 가족 정보 list 불러오기
     */
    getFamily():Observable<MrFamilyCodeResponse[]> {
        return this.http.get<MrFamilyCodeResponse[]>(`${this.FAMILY_URL}`);
    }
}
