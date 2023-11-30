import { MessageType } from "./MessageType";
import { DataObject } from "./DataType";

export interface Message {
    type: MessageType,
    content: string | string[] | DataObject[]
    
}