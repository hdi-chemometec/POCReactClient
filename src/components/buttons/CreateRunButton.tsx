import { FC, useContext } from 'react';
import CreateIcon from '../../styling/icons/CreateIcon'
import { RobotContext } from '../../context/useRobot';
import { RunStatusType } from '../../types/ServerTypes/RunStatusType';


const CreateRunButton: FC = () => {

    const { handleCreateRunClick, runStatus, robotProtocolList } = useContext(RobotContext);

    const handleClick = (): void => {
        handleCreateRunClick();
    }
    
    const handleDisabled = (): boolean => {
        if(runStatus === RunStatusType.RUNNING || runStatus === RunStatusType.PAUSED || runStatus === RunStatusType.STOP_REQUESTED || robotProtocolList.length === 0) {
            return true;
        }
        return false;
    }

    return(
        <div className= "inline-flex rounded-full justify-center w-20 h-20 mr-8 bg-primary text-secondary enabled:hover:bg-button-hover enabled:hover:text-primary">
            <button
                className='disabled:opacity-50'
                onClick={handleClick}
                disabled={handleDisabled()}>
                { <CreateIcon />}
            </button> 
        </div>
    );
}

export default CreateRunButton;