import { createContext, useContext, useState } from 'react';

const Context = createContext([null, (_) => {}]);

export const Provider = ({ children }) => {
  const [type, setNode] = useState(null);

  return (
    <Context.Provider value={[type, setNode]}>
      {children}
    </Context.Provider>
  );
}

export default Context;

export const useDiagram = () => {
  return useContext(Context);
}
