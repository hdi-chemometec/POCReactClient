export interface DataObject {
    acquisitionDateTime: string,
    analysisDateTime: string,
    approvedby: string,
    instrument: string,
    media: string,
    operatorid: string,
    protocol: string,
    registrationDateTime: string,
    sampleid: string,
    sid: string,
    tags: [],
    type: string,
    userid: string,
    values: ValueType[]
};

export type ValueType = {
    name: string,
    type: string,
    unit: string,
    value: string
}