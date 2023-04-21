import {UserModel} from "../user.model";

/**
 * 로그인 결과 객체
 */
export class LoginResultResponse {
    public jwt: string = '';
    public Date: Date|null = null;
    public User: UserModel = new UserModel();
}
