/**
 * 사용자 정보 객체
 */
export class UserResponseModel {
  public id: number = 0;
  public username: string = '';
  public password: string = '';
  public email: string = '';
  public role: string = '';
  public createDate: Date | null = null;
  public updateDate: Date | null = null;
}
