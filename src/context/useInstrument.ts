import { createContext } from 'react';

import { useInstrument } from "../components/hooks/useInstrumentContext"
import { StateType } from "../types/StateType";
import { DataObject } from "../types/DataType";

type ContextType = ReturnType<typeof useInstrument>;

export const InstrumentContext = createContext<ContextType>({
    instrumentName: 'No connected instrument',
    instrumentStateValue: StateType.NOSTATE,
    instrumentProtocolList: [''],
    selectedProtocol: '',
    handleProtocolSelected: (receivedProtocol: string) => null,
    instrumentMethodList: [''],
    selectedMethod: '',
    handleMethodSelected: (receivedMethod: string) => null,
    isRunning: false,
    handleRunClick: () => null,
    data: [] as DataObject[]
});