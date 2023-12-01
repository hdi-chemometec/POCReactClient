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
        if((instrumentStateConnection === false) ||(currentRobotRun === "") || runStatus !== RunStatusType.IDLE || instrumentStateValue !== (StateType.UNKNOWN || StateType.IDLE)){
            return true;
        } else{
            return false;
        }
    }
    
    const handleShowButton = (): boolean => {
        if(runStatus !== RunStatusType.UNKNOWN && (runStatus === RunStatusType.SUCCEEDED || runStatus === RunStatusType.STOPPED)){
            return false;
        }
        return true;
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