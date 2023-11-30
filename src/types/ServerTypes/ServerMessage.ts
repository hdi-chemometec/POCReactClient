import { ProtocolDataObject } from "./ProtocolType";
import { RunCreatedObject } from "./RunTypeObject";
import { ServerMessageType } from "./ServerMessageType";

export interface ServerMessage {
    type: ServerMessageType,
    content: string | ProtocolDataObject | RunCreatedObject | boolean
}