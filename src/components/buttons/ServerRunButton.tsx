import { FC, useContext } from 'react';
import RunIcon from '../../styling/icons/RunIcon'
import PauseIcon from '../../styling/icons/PauseIcon';
import { RobotContext } from '../../context/useRobot';
import { RunStatusType } from '../../types/ServerTypes/RunStatusType';


const ServerRunButton: FC = () => {

    const {handleRunClick, runStatus } = useContext(RobotContext);

    const handleClick = (): void => {
        handleRunClick();
    }
    
    const handleDisabled = (): boolean => {
        if(runStatus === RunStatusType.IDLE || runStatus === RunStatusType.PAUSED){
            return false;
        }
        return true;
    }

    const handleIcon = (): JSX.Element => {
        if(runStatus === RunStatusType.IDLE || runStatus === RunStatusType.PAUSED){
            return <RunIcon />;
        }
        return <PauseIcon />;
    }

    return(
        <div className= "button inline-flex rounded-full justify-center w-20 h-20 mr-8 bg-primary text-secondary">
            <button
            className='disabled:opacity-50'
                onClick={handleClick}
                disabled={handleDisabled()}>
                {handleIcon()}
            </button> 
        </div>
    );
}

export default ServerRunButton;