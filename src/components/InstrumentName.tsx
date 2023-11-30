import { FC } from "react";

import { StateType } from "../types/StateType";
import { RunStatusType } from "../types/ServerTypes/RunStatusType";

interface InstrumentNameProps {
    stateValue: StateType | RunStatusType;
}

const InstrumentName: FC<InstrumentNameProps> = ({stateValue}) => {



    const handleInstrumentColor = (stateValue: StateType | RunStatusType): string => {
        
        switch(stateValue) {
            case StateType.IDLE:
                return '#4FCF5A'; //green
            case RunStatusType.IDLE:
                return '#4FCF5A'; //green
            case StateType.BUSY:
                return '#f28029'; //orange
            case RunStatusType.PAUSED:
                    return '#f28029'; //orange
            case StateType.INTRANSITION:
                return '#E12F20'; //red
            case RunStatusType.RUNNING:
                return '#E12F20'; //red
            default:
                return '#FFFFFF'; //white
        }
    }

    return(
        <div className="text-left xl:text-xl md:text-lg sm:text-sm font-sans">
            <h2 style={{color: handleInstrumentColor(stateValue)}}>{stateValue}</h2>
        </div>
            
        );
}

export default InstrumentName;