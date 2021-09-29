import { Context, createContext, useState } from "react";

const AppContext: Context<any> = createContext({});

const AppProvider = (props: any) => {
  const [settings, setSettings] = useState({
    addresses: [],
    darkMode: true,
  });

  const set = (f: string, v: any) => {
    setSettings((prevSettings) => {
      return Object.assign({}, prevSettings, { [f]: v });
    });
  };

  return <AppContext.Provider value={{ settings, set }}>{props.children}</AppContext.Provider>;
};

export default AppContext;
export { AppProvider };
