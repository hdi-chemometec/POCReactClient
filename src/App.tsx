//react and hooks
import { FC, useContext } from 'react';

//UI components
import DropdownComponent from './components/dropdown/DropdownComponent';

//Context
import { RobotContext } from './context/useRobot';

//Robot
import RobotName from './components/RobotName';
import CreateRunButton from './components/buttons/CreateRunButton';
import ServerRunButton from './components/buttons/ServerRunButton';
import InstrumentName from './components/InstrumentName';
import InstrumentConnection from './components/instrumentConnection';
import { RunStatusType } from './types/ServerTypes/RunStatusType';


const App: FC = () => {

  const {robotProtocolList: protocolList, robotProtocol: protocol, instrumentStateValue, handleRobotProtocolSelected, currentRobotRun, runStatus} = useContext(RobotContext)

  return (
    <div className="App mt-24 mr-2 xl:mr-80 md:mr-52 sm:mr-24">
      <div className="justify-content-start items-center grid grid-cols-3 gap-2 p-1">
        <RobotName />
      </div>
      <div className="col-span-3 text-left text-primary font-sans xl:text-xl md:text-lg sm:text-sm p-1" >
        <h2>Robot run status:</h2>
        <InstrumentName stateValue={runStatus} />
      </div>

      <div className="justify-content-start items-center grid grid-cols-3 gap-2 p-1">
        <InstrumentConnection />
      </div>
      <div className="col-span-3 text-left text-primary font-sans xl:text-xl md:text-lg sm:text-sm p-1" >
        <h2>Instrument state:</h2>
        <InstrumentName stateValue={instrumentStateValue} />
      </div>


      <div className="col-span-3 gap-2 p-1">
          <div>
            <DropdownComponent dropdownOptions={protocolList} selectedValue={protocol} labelName={'Robot protocols'} selectItem={handleRobotProtocolSelected}/>
          </div>
        </div>

        <div className="col-span-2 row-span-2 p-1" >
          <CreateRunButton />
          <ServerRunButton />
        </div>

        <div className="col-span-3 text-left text-primary font-sans xl:text-xl md:text-lg sm:text-sm p-1" >
          <h2>Current run id:</h2>
        </div>
        <div className="col-span-3 text-left text-primary font-sans xl:text-xl md:text-lg sm:text-sm p-1" >
          <h2>{currentRobotRun}</h2>
        </div>
        <div className="col-span-3 text-left text-green-500 font-sans xl:text-xl md:text-lg sm:text-sm p-1" >
          <h2>{currentRobotRun && runStatus===RunStatusType.IDLE? "Robot is ready to go !" : ""}</h2>
        </div>

        <div>

        </div>
      
    </div>
  );
}

export default App;