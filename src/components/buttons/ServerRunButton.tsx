import { FC, useContext } from 'react';
import RunIcon from '../../styling/icons/RunIcon'
import { RobotContext } from '../../context/useRobot';
import { RunStatusType } from '../../types/ServerTypes/RunStatusType';
import { StateType } from '../../types/StateType';


const ServerRunButton: FC = () => {

    const { handleRunClick, runStatus, instrumentStateConnection, currentRobotRun, instrumentStateValue } = useContext(RobotContext);

    const handleClick = (): void => {
        handleRunClick();
    }
    
    const handleDisabled = (): boolean => {
        if((runStatus !== RunStatusType.IDLE && runStatus !== RunStatusType.PAUSED) || (instrumentStateConnection === false) ||(currentRobotRun === "") || (instrumentStateValue === StateType.ERROR) || (instrumentStateValue === StateType.INTRANSITION) || (instrumentStateValue === StateType.NOSTATE)){
            return true;
        } else{
            return false;
        }
    }
    
    const handleShowButton = (): boolean => {
        if(runStatus !== RunStatusType.UNKNOWN){
            return true;
        }
        return false;
    }

    const showButton = handleShowButton();

    return(
        <div>
            {showButton && (<div className= "button inline-flex rounded-full justify-center w-20 h-20 mr-8 bg-primary text-secondary">
                <button
                className='disabled:opacity-50'
                    onClick={handleClick}
                    disabled={handleDisabled()}>
                    {<RunIcon />}
                </button>
            </div>)}
        </div>
    );
}

export default ServerRunButton;