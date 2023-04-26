import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MrFamilyCodeResponse} from "../model/response/mr-family-code.response.model";
import {MrObjectImageResponse} from "../model/response/mr-object-image.response.model";
import {MrGenderCodeResponse} from "../model/response/mr-gender-code.response.model";
import {MrJobCodeResponse} from "../model/response/mr-job-code.response.model";
import {MrFamilyRelationCodeResponse} from "../model/response/mr-family-relation-code.response.model";
import {MrObjectModel} from "../model/mr-object.model";
import {MrDataSetRequestModel} from "../model/request/mr-data-set.request.model";
import {MrObjectCodeResponseModel} from "../model/response/mr-object-code.response.model";
import {MrDataSetResponseModel} from "../model/response/mr-data-set.response.model";

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
     * 타입별 오브젝트 코드 조회
     */
    getObjectCode(type: number) :Observable<MrObjectCodeResponseModel[]> {
        return this.http.get<MrObjectCodeResponseModel[]>(`${this.MR_CONTROL_URL}/${type}/objectCode`);
    }

    /**
     * 사용자 데이터 세트 조회
     */
    getDataSet():Observable<MrDataSetResponseModel[]>{
        return this.http.get<MrDataSetResponseModel[]>(`${this.MR_CONTROL_URL}/dataSet`);
    }

    /**
     * 회차별 DataSet 생성
     */
    postDataSet(request: MrDataSetRequestModel) : Observable<MrDataSetRequestModel> {
        return this.http.post<MrDataSetRequestModel>(`${this.MR_CONTROL_URL}/dataSet`, request);
    }


    /**
     * DataSet 삭제
     * @param id
     */
    deleteDataSet(id: number): Observable<MrDataSetResponseModel>{
        return this.http.patch<MrDataSetResponseModel>(`${this.MR_CONTROL_URL}/dataSet/${id}`,id);
    }

    /**
     * 회차별 사용자 데이터 세트 조회
     * @param seq
     */
    getSeqDataSet(seq: number): Observable<MrDataSetResponseModel> {
        return this.http.get<MrDataSetResponseModel>(`${this.MR_CONTROL_URL}/dataSet/${seq}`);
    }



    /**
     * 가족 리스트 조회
     */
    getFamily():Observable<MrFamilyCodeResponse[]> {
        return this.http.get<MrFamilyCodeResponse[]>(`${this.MR_CONTROL_URL}/family`);
    }

    /**
     * 가족 관계 리스트 조회
     */
    getFamilyRelation(): Observable<MrFamilyRelationCodeResponse[]> {
        return this.http.get<MrFamilyRelationCodeResponse[]>(`${this.MR_CONTROL_URL}/familyRelation`);
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

    /**
     * 회차별 사용자 오브젝트 조회
     * @param seq
     */
    getSeqObject(seq: number): Observable<MrObjectModel> {
        return this.http.get<MrObjectModel>(`${this.MR_CONTROL_URL}/object/${seq}`);
    }



    /**
     * 오브젝트 이미지 리스트 조회
     */
    getObjectData(): Observable<MrObjectImageResponse[]> {
        return this.http.get<MrObjectImageResponse[]>(`${this.MR_CONTROL_URL}/objectImage`);
    }

    /**
     * 회차별 오브젝트 생성
     */
    postObject(request: MrObjectModel[]) : Observable<MrObjectModel[]> {
        return this.http.post<MrObjectModel[]>(`${this.MR_CONTROL_URL}/seq/object`, request);
    }




    /**
     * 회차별 사용자 오브젝트 순서 목록 조회
     * @param seq
     */
    getObjectCodeSeq(seq: number): Observable<MrObjectCodeResponseModel[]>{
        return this.http.get<MrObjectCodeResponseModel[]>(`${this.MR_CONTROL_URL}/user/objectCode/${seq}`)
    }
}

