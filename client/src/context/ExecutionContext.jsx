import { createContext, useContext, useState } from "react";

const Execution = createContext();

const ExecutionContext = ({ children }) => {
  const [myExecution, setMyExecution] = useState([]);
  const [selectExecution, setSelectExecution] = useState(null)

  return (
    <Execution.Provider value={{ myExecution, setMyExecution, selectExecution, setSelectExecution }}>
      {children}
    </Execution.Provider>
  );
};

export const ExecutionState = () => {
  return useContext(Execution);
};

export default ExecutionContext;