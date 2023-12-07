//react and hooks
import { FC, useContext } from 'react';

//UI components
import DropdownComponent from './components/dropdown/DropdownComponent';

//Context
import { RobotContext } from './context/useRobot';

//Robot
import RobotConnection from './components/RobotConnection';
import CreateRunButton from './components/buttons/CreateRunButton';
import ServerRunButton from './components/buttons/ServerRunButton';
import StateHandler from './components/StateHandler';
import InstrumentConnection from './components/instrumentConnection';
import { RunStatusType } from './types/ServerTypes/RunStatusType';


const App: FC = () => {

  const {robotProtocolList: protocolList, robotProtocol: protocol, instrumentStateValue, handleRobotProtocolSelected, currentRobotRun, runStatus} = useContext(RobotContext)


  const isEmpty:boolean = (currentRobotRun === "" || currentRobotRun === undefined) ? false : true;

  return (
    <div className="App mt-24 mr-2 xl:mr-80 md:mr-52 sm:mr-24">
      <div className="justify-content-start items-center grid grid-cols-3 gap-2 p-1">
        <RobotConnection />
      </div>
      <div className="col-span-3 text-left text-primary font-sans xl:text-xl md:text-lg sm:text-sm p-1" >
        <h2>Robot run status:</h2>
        <StateHandler stateValue={runStatus} />
      </div>

      <div className="justify-content-start items-center grid grid-cols-3 gap-2 p-1">
        <InstrumentConnection />
      </div>
      <div className="col-span-3 text-left text-primary font-sans xl:text-xl md:text-lg sm:text-sm p-1" >
        <h2>Instrument state:</h2>
        <StateHandler stateValue={instrumentStateValue} />
      </div>


      <div className="col-span-3 gap-2 p-1">
          <div>
            <DropdownComponent dropdownOptions={protocolList} selectedValue={protocol} labelName={'Robot protocols'} selectItem={handleRobotProtocolSelected}/>
          </div>
        </div>

        <div className="col-span-2 row-span-2 p-1 flex" >
          <CreateRunButton />
          <ServerRunButton />
        </div>

        <div className="col-span-3 text-left text-primary font-sans xl:text-xl md:text-lg sm:text-sm p-1" >
          <h2>Current run id:</h2>
        </div>

        <div className="col-span-3 text-left text-primary font-sans xl:text-xl md:text-lg sm:text-sm p-1" >
          {isEmpty && <h2>{currentRobotRun}  </h2>}
        </div>

        <div className="col-span-3 text-left text-green-500 font-sans xl:text-xl md:text-lg sm:text-sm p-1" >
          <h2>{currentRobotRun && runStatus===RunStatusType.IDLE? "Robot is ready to go !" : ""}</h2>
        </div>      
    </div>
  );
}

export default App;