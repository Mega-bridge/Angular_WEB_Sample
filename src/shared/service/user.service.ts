import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserModel} from "../model/user.model";
import {MrFamilyCodeResponse} from "../model/response/mr-family-code.response.model";


@Injectable({
    providedIn: 'root'
})
export class UserService {

    public SEVER_URL = 'http://localhost:8080/user';

    /**
     * 생성자
     * @param http
     */
    constructor(private http: HttpClient) { }


    /**
     * 로그인 처리
     */
    signUp(request: UserModel):Observable<UserModel> {
        return this.http.post<UserModel>(`${this.SEVER_URL}/`,request);
    }

    getAllUser():Observable<MrFamilyCodeResponse[]> {
        return this.http.get<MrFamilyCodeResponse[]>(`${this.SEVER_URL}/userList`);
    }
}
