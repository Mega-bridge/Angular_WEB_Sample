/**
 * 오브젝트별 데이터 세트 생성
 */
export class MrDataSetRequestModel {
    public id: number = 0;
    public seq: number = 0;

    // 회차 추가시 timestamp
    public testDate : Date | null = null;

    // user.id
    public userEmail:string = '';

    // mr_patient_info.id
    public patientInfoId: number | null = 0;

    // mr_object_code.id
    public fishbowlCode: number = 0;

    // mr_object_code.water_height
    public waterHeight: number = 0;

    // event 횟수
    public actionCount: number = 0;
    // 물고기 갯수
    public fishCount: number = 0;
    // 기타 갯수
    public etcCount: number = 0;

    // mr_result_sheet.id
    public resultSheetId: number = 0;


}
