export enum ServerTransmitMessageType{
    PING = "PING",
    SERVER = "SERVER",
    ROBOT = "ROBOT",
    PROTOCOLS = "PROTOCOLS",
    RUN_STATUS = "RUN_STATUS",
    RUN = 'RUN',
    COMMAND = "COMMAND",
    STATE = "STATE"
}

export interface ServerTransmitMessage {
    type : ServerTransmitMessageType;
} 

export interface TransmitRunMessage extends ServerTransmitMessage{
    protocolId: string
}


export interface TransmitCommandMessage extends ServerTransmitMessage{
    protocolId: string,
    command: string
}
