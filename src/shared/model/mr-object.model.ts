/**
 * 회차별 오브젝트
 */
export class MrObjectModel {
    public id: number = 0;

    // mr_data_set.seq
    public dataSetSeq: number = 0;

    // user.id
    public userId: number = 0;

    // mr_object_code.id
    public objectCodeId: number = 0;

    // mr_family_code.id
    public name: number = 0;

    public x: number = 0;
    public y: number = 0;
    public angle: number | undefined = 0;
    public width: number = 0;
    public height: number = 0;

    // 저장된 순서
    public objectSeq: number = 0;

    // 오브젝트 생성시 timestamp
    public createDate: Date | null =  null;
}
