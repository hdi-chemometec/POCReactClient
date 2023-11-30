import { FC } from 'react';
import './index.css';
import App from './App';
import { RobotContext } from './context/useRobot';
import { useRobot } from './components/hooks/useRobotContext';


const RobotContextWrapper: FC = () => {

  const robot = useRobot();

  return (
    <RobotContext.Provider value={robot}>
        <App />
    </RobotContext.Provider>
  );
};

export default RobotContextWrapper;