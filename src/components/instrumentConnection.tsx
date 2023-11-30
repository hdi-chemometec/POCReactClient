import { FC, useContext } from "react";
import { RobotContext } from "../context/useRobot";

const InstrumentConnection: FC = () => {

    const { instrumentState } = useContext(RobotContext);

    const handleRobotColor = (instrumentState: string): string => {
        if(instrumentState === 'Instrument is not connected') {
            return '#E12F20'; //red
        }
        else {
            return '#4FCF5A'; //green
        }
    }

    return(
        <div className="text-left xl:text-xl md:text-lg sm:text-sm font-sans">
            <h2 style={{color: handleRobotColor(instrumentState)}}>{instrumentState}</h2>
        </div>
            
        );
}

export default InstrumentConnection;