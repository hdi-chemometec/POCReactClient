import { FC, useContext } from 'react';
import { StateType } from '../../types/StateType';
import RunIcon from '../../styling/icons/RunIcon'
import PauseIcon from '../../styling/icons/PauseIcon';
import { InstrumentContext } from '../../context/useInstrument';


const RunButton: FC = () => {

    const {instrumentStateValue, isRunning, handleRunClick } = useContext(InstrumentContext);

    const handleClick = (): void => {
        handleRunClick();
    }
    
    const handleDisabled = (): boolean => {
        if(isRunning){
            return true;
        }
        if(instrumentStateValue === StateType.IDLE) {
            return false;
        }
        return true;
    }

    return(
        <div className= "button inline-flex rounded-full justify-center w-20 h-20 mr-8 bg-primary text-secondary hover:bg-button-hover hover:text-primary">
            <button
                onClick={handleClick}
                disabled={handleDisabled()}>
                {!isRunning && <RunIcon />}
                {isRunning && <PauseIcon />}
            </button> 
        </div>
    );
}

export default RunButton;