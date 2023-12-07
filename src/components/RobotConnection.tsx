import { FC, useContext } from "react";
import { RobotContext } from "../context/useRobot";
import { RobotType } from "../types/ServerTypes/RobotType";

const RobotConnection: FC = () => {

    const { robotState, robotConnection } = useContext(RobotContext);

    const handleRobotColor = (robotState: RobotType): string => {
        switch(robotState) {
            case RobotType.CONNECTED:
                return '#4FCF5A'; //green
            case RobotType.NOT_CONNECTED:
                return '#E12F20'; //red
            default:
                return '#FFFFFF'; //white
        }
    }

    return(
        <div className="text-left xl:text-xl md:text-lg sm:text-sm font-sans">
            <h2 style={{color: handleRobotColor(robotConnection)}}>{robotState}</h2>
        </div>
            
        );
}

export default RobotConnection;