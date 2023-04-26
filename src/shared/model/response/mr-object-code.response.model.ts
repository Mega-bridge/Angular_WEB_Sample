/**
 * 타입별 오브젝트 코드 조회
 */

export class MrObjectCodeResponseModel {
    public id: number = 0;

    /** 0=물고기, 1=어항, 2=기타 */
    public type: number = 0;

    /** 0=기본, 1=삐진, 2=슬픈, 3=웃는, 4=화난 */
    public face: number = 0;

    /** 0=물없는, 1=물적은, 2=물충분, 3=물많은 */
    public waterHeight: number = 0;

    public code: string = '';
    public description: string = '';
}
