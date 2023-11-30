import { useState, useEffect } from "react";
import useWebSocket from 'react-use-websocket';

import { StateType } from '../../types/StateType';
import { MessageType } from "../../types/MessageType";
import { DataObject } from "../../types/DataType";
import { Message } from "../../types/Message";
import { TransmitMessage, TransmitMessageType, TransmitHelloMessage, TransmitMethodMessage, TransmitRunMessage, TransmitDataMessage } from "../../types/MessageInterpreter";



export const useInstrument = () => {
  
  // -------------- Instrument states -------------- //
  const [instrumentName, setInstrumentName] = useState<string>('No connected instrument');

  const [instrumentStateValue, setInstrumentStateValue] = useState<StateType>(StateType.NOSTATE);

  const [instrumentProtocolList, setInstrumentProtocolList] = useState<string[]>(['']);
  const [selectedProtocol, setSelectedProtocol] = useState<string>('');
  
  const [instrumentMethodList, setInstrumentMethodList] = useState<string[]>(['']);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const [data, setData] = useState<DataObject[]>([]);

  // -------------- WS -------------- //
  const [messageHistory, setMessageHistory] = useState<MessageEvent[]>([]);

  const port = 80;
  const socketUrl =`ws://localhost:${port}/ws`;

  const {
      sendJsonMessage,
      lastMessage,
  } = useWebSocket(socketUrl,
  {
      onOpen: () => {
      console.log('Client has connected');
      handleNewConnection();
      },

      onClose: () => {
      console.log('Client has disconnected');
      resetInstrumentInformation();},

      onMessage: () => {
      console.log('Received a message from server');
    },
  });

  //when receiving a new message from the ws add it to the messageHistory
  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage]);

  // when a message is received from the ws handle each message
  useEffect(()=> {
    console.log("Deal with message history here: " + messageHistory.length + " messages remaining!");

    while(messageHistory.length > 0) {
      const message = messageHistory.pop();
      console.log("websocketMessage: ", message);

      if(message !== undefined) {
        handleReceivedMsg(message.data);
      } else {
        console.log('Message was undefined');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[messageHistory]);

  //handle parsing strings as json and sending to ws
  const transmitMsg = (message: TransmitMessage | TransmitHelloMessage | TransmitMethodMessage  | TransmitRunMessage | TransmitDataMessage): void => {
    const stringifiedObject = JSON.stringify(message)
    const jsonObject = JSON.parse(stringifiedObject)
    sendJsonMessage(jsonObject);
  }

  // ----------handle ws messages----------- //
  const handleReceivedMsg = (message: string): void => {
    const msg = JSON.parse(message) as Message;
    
    console.log(`The received message type is ${msg.type}`);

    switch(msg.type) {
      case MessageType.HELLO: {
        console.log(msg.content)

        const str: string = 'Hello from client';
        const messageToSend: TransmitHelloMessage = {
          type: TransmitMessageType.HELLO,
          hello: str
        }
        transmitMsg(messageToSend);
        break;
      }

      case MessageType.STATE: {
        console.log(msg.content)
        let state : StateType = msg.content as StateType;
        handleStateChange(state);
        break;
      }

      case MessageType.NAME: {
        console.log(msg.content)
        let instrumentName: string = msg.content as string;
        handleNameChange(instrumentName);
        break;
      }

      case MessageType.PROTOCOL: {
        console.log(msg.content)
        let protocolList : string[]  = msg.content as string[];
        setInstrumentProtocolList(protocolList);

        //fetch the measurements for the given protocol
        handleProtocolSelected(protocolList[0]);
        break;
      }

      case MessageType.METHOD: {
        console.log(msg.content)
        let methodList : string[]  = msg.content as string[];
        setInstrumentMethodList(methodList);

        //set the measurement's init value to be the first in the fetched list:
        handleMethodSelected(methodList[0]);
        break;
      }

      case MessageType.RUN: {
        console.log(msg.content);
        break;
      }

      case MessageType.DATA_READY: {
        console.log(msg.content);
        let isDataReady : string = msg.content as string;
        handleIsDataReady(isDataReady);
        break;
      }

      case MessageType.DATA: {
        console.log(msg.content);
        let dataList : DataObject[]  = msg.content as DataObject[];
        handleReceivedData(dataList);
        break;
      }

      default: {
        console.log(`Unknown message received: ${msg.content}`);
        break;
      }
    }
  }

  // ---------- methods to handle ws messages----------- //

  //when client connects fetch instrument information
  const handleNewConnection = (): void => {
    const messageToSendState : TransmitMessage = {
      type : TransmitMessageType.STATE
    }
    transmitMsg(messageToSendState);

    //insert fetching data from today
    let currentTime: string[] = getCurrentTime();

    const messageToSendData: TransmitDataMessage = {
      type: TransmitMessageType.DATA,
      startDate: currentTime[0],
      endDate: currentTime[1]
    }
    transmitMsg(messageToSendData);
  }

  //when client disconnects reset states
  const resetInstrumentInformation = ():void => {
    setInstrumentName('No connected instrument');
    setInstrumentStateValue(StateType.NOSTATE);

    setInstrumentProtocolList(['']);
    setSelectedProtocol('');

    setInstrumentMethodList(['']);
    setSelectedMethod('');

    setIsRunning(false);

    setData([] as DataObject[]);
  }

  //should handle when the state changes to change the name, state, protocol and measurement
  const handleStateChange = (receivedState: StateType): void => {
    setInstrumentStateValue(receivedState);

    //handle isRunning
    if(receivedState === StateType.BUSY) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }

    //fetching name
    const messageToSendName : TransmitMessage = {
      type: TransmitMessageType.NAME
    }
    transmitMsg(messageToSendName);

    if(receivedState === StateType.IDLE){
      //fetch the measurements for the given protocol if empty
      if(selectedProtocol === ''){
        handleFetchingProtocolList();
      }
    }
  }

  //When instrument connects/disconnect/other, update name
  const handleNameChange = (currentName: string): void => {
    if(instrumentStateValue === (StateType.INTRASITION || StateType.POWEROFF || StateType.UNKNOWN || StateType.NOSTATE )) {
      setInstrumentName('No connected instrument')
    }
    if(instrumentStateValue === StateType.ERROR) {
      setInstrumentName('Something went wrong, Error-state')
    } else {
      setInstrumentName(currentName);
    }
  }

  //fecth Protocol list from backend
  const handleFetchingProtocolList = (): void => {
  //fetch protocol list if previous list is empty or undefined
    const messageToSendProtocol : TransmitMessage = {
      type: TransmitMessageType.PROTOCOL
    }
    transmitMsg(messageToSendProtocol);
  }

  //when client selects a protocol fetch it's methods, used by dropdown component
  const handleProtocolSelected = (receivedProtocol: string): void => {
    //if the selected protocol is equal to the previous, don't fetch

    const messageToSendMethod : TransmitMethodMessage = {
      type : TransmitMessageType.METHOD,
      measurement: receivedProtocol
    }

    if(receivedProtocol !== selectedProtocol){
      setSelectedProtocol(receivedProtocol);
      transmitMsg(messageToSendMethod);
    }
  }
  

  //when a client chooses a method set the method
  const handleMethodSelected = (receivedMethod: string): void => {
    setSelectedMethod(receivedMethod);
  }

  //handle for clicking run button and sending chosen protocol and measurement and run instrument
  const handleRunClick = (): void => {
    const messageToSendRun : TransmitRunMessage = {
      type: TransmitMessageType.RUN,
      measurement: selectedProtocol,
      assay: selectedMethod
    }
    transmitMsg(messageToSendRun);
    setIsRunning(true);
  }

  const handleReceivedData = (receivedData: DataObject[]): void => {
    setData(receivedData);
  }
  
  const getCurrentTime = (): string[] => {
    let time = new Date ();
    let year = (time.getUTCFullYear())+'-';
    let month = (time.getUTCMonth()+1);
    let date = (time.getUTCDate());
    
    //the correct format is YYYY-MM-DD HH:MM:SS    
    let newDate;
    let newMonth;

    if (month < 10) {
      newMonth = '0' + month + '-';
    } else {
      newMonth = month  + '-'; }
    if (date < 10) {
      newDate = '0' + date + ' ';
    } else {
      newDate = date + ' '; }

    //convert to string
    let convertedStartTime = 
    ( year.toString()+
      newMonth.toString()+
      newDate.toString()+

      /*the data should be fetched from today,
       so for now the time is hardcoded.
       TODO: Later on a date- and time picker should be implemented*/
      '00:00:00'
    );

    let convertedEndTime = 
    ( year.toString()+
      newMonth.toString()+
      newDate.toString()+
      '23:59:59'
    );

    let dates = [convertedStartTime, convertedEndTime]
    return dates;
  }

  const handleIsDataReady = (isDataReady :string): void => {
    if(isDataReady === 'true'){
      let currentTime: string[] = getCurrentTime();
      const messageToSendData: TransmitDataMessage = {
        type: TransmitMessageType.DATA,
        startDate: currentTime[0],
        endDate: currentTime[1]
      }
      transmitMsg(messageToSendData);
    }
  }

  return {
    instrumentName,
    instrumentStateValue,
    instrumentProtocolList,
    selectedProtocol,
    handleProtocolSelected,
    instrumentMethodList,
    selectedMethod,
    handleMethodSelected,
    isRunning,
    handleRunClick,
    data
  };
}