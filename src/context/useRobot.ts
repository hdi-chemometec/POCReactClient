import { createContext } from 'react';

import { useRobot } from "../components/hooks/useRobotContext"
import { RobotType } from '../types/ServerTypes/RobotType';
import { RunType } from '../types/RunType';
import { RunStatusType } from '../types/ServerTypes/RunStatusType';
import { StateType } from '../types/StateType';

type ContextType = ReturnType<typeof useRobot>;

export const RobotContext = createContext<ContextType>({
    robotState: 'No connected robot',
    robotConnection: RobotType.UNKNOWN,
    robotProtocolList: [],
    robotProtocol: '',
    currentRobotRun: '',
    runCommand: RunType.NOT_STARTED,
    runStatus: RunStatusType.UNKNOWN,
    instrumentStateValue: StateType.UNKNOWN,
    instrumentState: 'No connected instrument',
    handleRobotProtocolSelected: (receivedProtocol: string) => null,
    handleCreateRunClick: () => null,
    handleRunClick: () => null,
});