import { useState, useEffect } from "react";

import { ServerMessage } from "../../types/ServerTypes/ServerMessage";
import { ServerMessageType } from "../../types/ServerTypes/ServerMessageType";
import { RobotType } from "../../types/ServerTypes/RobotType";
import { ProtocolDataObject } from "../../types/ServerTypes/ProtocolType";
import { ServerTransmitMessage, ServerTransmitMessageType, TransmitCommandMessage, TransmitRunMessage } from "../../types/ServerTypes/ServerMessageInterpreter";

import ProtocolType from "../../types/ServerTypes/ServerProtocolType";
import { RunCreatedObject } from "../../types/ServerTypes/RunTypeObject";
import { RunType } from "../../types/RunType";
import { RunStatusType } from "../../types/ServerTypes/RunStatusType";
import { useWebSocketWithRetry } from "./useWebSocketWithRetry";

import { JsonValue } from "react-use-websocket/dist/lib/types";
import { StateType } from "../../types/StateType";

export const useRobot = () => {

    const [robotState, setRobotState] = useState<string>('Robot is not connected');
    const [robotConnection, setRobotConnection] = useState<RobotType>(RobotType.UNKNOWN);
    const [robotProtocolNameList, setRobotProtocolNameList] = useState<string[]> ([]);
    const [robotProtocol, setRobotProtocol] = useState<string> ('');
    const [currentRobotRun, setCurrentRobotRun] = useState<string> ('');
    const [runCommand, setRunCommand] = useState<RunType> (RunType.NOT_STARTED);
    const [runStatus, setRunStatus] = useState<RunStatusType> (RunStatusType.UNKNOWN);
    const [robotProtocolList, setRobotProtocolList] = useState<ProtocolType[]> ([]);

    // -------------- instrument -------------- //
    const [instrumentState, setInstrumentState] = useState<string>('Instrument is not connected');
    const [instrumentStateConnection, setInstrumentStateConnection] = useState<boolean>(false);
    const [instrumentStateValue, setInstrumentStateValue] = useState<StateType>(StateType.NOSTATE);
    
    // -------------- WS -------------- //
  const [messageHistory, setMessageHistory] = useState<JsonValue[]>([]);

  const port = 8084;
  const socketUrl =`ws://localhost:${port}/`;
  const {sendJsonMessage,
    lastJsonMessage} = useWebSocketWithRetry(socketUrl, () => {handleClosedConnection()}, () => {handleNewConnection()} );


  //when receiving a new message from the ws add it to the messageHistory
  useEffect(() => {
    if (lastJsonMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastJsonMessage));
    }
  }, [lastJsonMessage]);

  // when a message is received from the ws handle each message
  useEffect(()=> {
    console.log("Deal with message history here: " + messageHistory.length + " messages remaining!");

    while(messageHistory.length > 0) {
      const message = messageHistory.pop();
      console.log("websocketMessage: ", message);

      if(message !== undefined) {
        handleReceivedMsg(message);
      } else {
        console.log('Message was undefined');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[messageHistory]);

  const handleReceivedMsg = (message: JsonValue): void => {
    const msg = JSON.parse(JSON.stringify(message)) as ServerMessage;

    console.log("Message type: ", msg.type);

    switch(msg.type) {
      case ServerMessageType.PING:
        console.log("PONG ", msg.content);
        break;
      case ServerMessageType.SERVER:
        console.log(msg.content);
        break;
      case ServerMessageType.ROBOT:
        console.log("Received robot");
        if(msg.content !== "False") {
          console.log("Robot is connected");
          setRobotState("Robot is connected");
          setRobotConnection(RobotType.CONNECTED);
        } else {
          console.log("Robot is not connected");
          setRobotState("Robot is not connected");
          setRobotConnection(RobotType.NOT_CONNECTED);
        }
        break;
      case ServerMessageType.PROTOCOLS:
        console.log("Received protocol");
        let protocols : ProtocolDataObject = msg.content as ProtocolDataObject;
        let tempList: string[] = [];
        for(let i = 0; i < protocols.meta.totalLength; i++) {
          let tempId = protocols.data[i].id;
          let tempName = protocols.data[i].metadata.protocolName;
          let tempObject: ProtocolType  = {id:tempId, name:tempName};
          setRobotProtocolList(robotProtocolListNew => [...robotProtocolListNew, tempObject]);
          if(protocols.data[i].metadata.protocolName !== undefined){
            tempList.push(protocols.data[i].metadata.protocolName!);
          } else {
            tempList.push(protocols.data[i].files[0].name);
          }
        }
        setRobotProtocolNameList(tempList);
        handleRobotProtocolSelected(tempList[0]);
        break;
      case ServerMessageType.RUN:
        console.log("Received run");
        let run : RunCreatedObject = msg.content as RunCreatedObject;
        setCurrentRobotRun(run.runId);
        sendJsonMessage({type: ServerTransmitMessageType.RUN_STATUS});
        break;
      case ServerMessageType.COMMAND:
        console.log("Received command");
        let command : RunType = msg.content as RunType;
        setRunCommand(command);
        break;
      case ServerMessageType.STATE: {
        let state : StateType = msg.content as StateType;        
        handleStateChange(state);
        break;
      }
      case ServerMessageType.RUN_STATUS:
        console.log("Received run status");
        let runStatus : RunStatusType = msg.content as RunStatusType;
        if(runStatus.length === 0) {
          break;
        }
        setRunStatus(runStatus);
        break;
      case ServerMessageType.INSTRUMENT_CONNECTION:
        console.log("Received instrument connection");
        let instrumentConnection : boolean = msg.content as boolean;
        setInstrumentStateConnection(instrumentConnection);
        if(instrumentConnection === false) {
          setInstrumentState('Instrument is not connected');
        } else {
          setInstrumentState('Instrument is connected');
        }
        sendJsonMessage({type: ServerTransmitMessageType.STATE});
        break;
      case ServerMessageType.ERROR:
        console.log("Received error");
        console.log(msg.content);
        break;
      default:
        console.log("Received unknown message type: ", msg.type);
        break;
    }
  }

  //when client connects fetch instrument information
  const handleNewConnection = (): void => {
    console.log('8084: Client connected');
    sendJsonMessage({type: ServerTransmitMessageType.ROBOT});
    sendJsonMessage({type: ServerTransmitMessageType.SERVER});
    sendJsonMessage({type: ServerTransmitMessageType.PROTOCOLS});
    sendJsonMessage({type: ServerTransmitMessageType.STATE});
    sendJsonMessage({type: ServerTransmitMessageType.RUN_STATUS});
  }
  
  const handleClosedConnection = (): void => {
    console.log('8084: Client disconnected');
    setRobotState("Robot is not connected");
    setRobotConnection(RobotType.NOT_CONNECTED);
    setRobotProtocolNameList([]);
    setRobotProtocol('');
    setCurrentRobotRun('');
    setRunCommand(RunType.NOT_STARTED);
    setRunStatus(RunStatusType.UNKNOWN);
    setRobotProtocolList([]);
    setInstrumentStateValue(StateType.UNKNOWN);
    setInstrumentState('Instrument is not connected');
  }

  const handleRobotProtocolSelected = (receivedProtocol: string): void => {
    //if the selected protocol is equal to the previous, don't fetch
    if(receivedProtocol !== robotProtocol){
      setRobotProtocol(receivedProtocol);
    }
  }

  const handleCreateRunClick = (): void => {
    console.log("Creating run")
    let protocolId: string = "";
    for(let protocol in robotProtocolList){
      if(robotProtocolList[protocol].name === robotProtocol){
        protocolId = robotProtocolList[protocol].id;
      }
    }
    if(protocolId){
    const messageToSend: TransmitRunMessage = {
      type: ServerTransmitMessageType.RUN,
      protocolId: protocolId
    };
    console.log("Message to send: ", messageToSend);
    transmitMessage(messageToSend);
    }
  }

  const handleRunClick = (): void => {
    console.log("Clicked run");
    const messageToSend: TransmitCommandMessage = {
      type: ServerTransmitMessageType.COMMAND,
      protocolId: currentRobotRun,
      command: RunType.PLAY
    };
    transmitMessage(messageToSend);
    console.log("Either robot or instrument is not idle");
  }

  const handleStateChange = (receivedState: StateType): void => {
    setInstrumentStateValue(receivedState);
  }

  const transmitMessage = (message: ServerTransmitMessage | TransmitRunMessage | TransmitCommandMessage ): void => {
    const stringifiedObject = JSON.stringify(message);
    const jsonObject = JSON.parse(stringifiedObject);
    sendJsonMessage(jsonObject);
  }

  return {
    robotState,
    robotConnection,
    robotProtocolList: robotProtocolNameList,
    robotProtocol: robotProtocol,
    currentRobotRun: currentRobotRun,
    runCommand: runCommand,
    runStatus: runStatus,
    instrumentState: instrumentState,
    instrumentStateValue: instrumentStateValue,
    instrumentStateConnection: instrumentStateConnection,
    handleRobotProtocolSelected,
    handleCreateRunClick,
    handleRunClick,
  };
}