export enum TransmitMessageType{
    HELLO = "HELLO",
    STATE = "STATE",
    NAME = "NAME",
    PROTOCOL = "MEASUREMENT",
    METHOD = "ASSAY",
    RUN = "RUN",
    DATA = "DATA"
}

export interface TransmitMessage {
    type : TransmitMessageType;
} 

export interface TransmitHelloMessage extends TransmitMessage{
    hello: string
}

export interface TransmitMethodMessage extends TransmitMessage{
    measurement: string
}

export interface TransmitRunMessage extends TransmitMessage{
    measurement: string,
    assay: string
}

export interface TransmitDataMessage extends TransmitMessage{
    startDate: string,
    endDate: string
}


