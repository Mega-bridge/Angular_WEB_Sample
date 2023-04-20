import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MrFamilyCodeResponse} from "../model/response/mr-family-code.response.model";
import {MrObjectImageResponse} from "../model/response/mr-object-image.response.model";
import {MrGenderCodeResponse} from "../model/response/mr-gender-code.response.model";
import {MrJobCodeResponse} from "../model/response/mr-job-code.response.model";
import {MrFamilyRelationCodeResponse} from "../model/response/mr-family-relation-code.response.model";

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
     * 가족 관계 list 불러오기
     */
    getFamilyRelation(): Observable<MrFamilyRelationCodeResponse[]> {
        return this.http.get<MrFamilyRelationCodeResponse[]>(`${this.MR_CONTROL_URL}/familyRelation`);
    }

    /**
     * object 정보 불러오기
     */
    getObjectData(): Observable<MrObjectImageResponse[]> {
        return this.http.get<MrObjectImageResponse[]>(`${this.MR_CONTROL_URL}/objectImage`);
    }

    /**
     * 성별 list 불러오기
     */
    getGender(): Observable<MrGenderCodeResponse[]> {
        return this.http.get<MrGenderCodeResponse[]>(`${this.MR_CONTROL_URL}/gender`);
    }

    /**
     * 직업 list 불러오기
     */
    getJob(): Observable<MrJobCodeResponse[]> {
        return this.http.get<MrJobCodeResponse[]>(`${this.MR_CONTROL_URL}/job`);
    }
}

