/**
 * 오브젝트별 데이터 세트 생성
 */
export class MrDataSetRequestModel {
    public id: number = 0;
    public seq: number = 0;
    public testDate : Date | null = null;

    // user.id
    public userId: number = 0;

    // mr_patient_info.id
    public patientInfoId: number = 0;

    // mr_object_code.id
    public fishbowlCode: number = 0;

    // mr_object_code.water_height
    public waterHeight: number = 0;

    public controlCount: number = 0;
    public fishCount: number = 0;
    public etcCount: number = 0;

    // mr_object.id
    public objectId: number = 0;

}
