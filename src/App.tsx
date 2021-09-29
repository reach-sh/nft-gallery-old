import { useContext } from "react";
import AppContext from "./context/appContext";

import Library from "./views/Library";
import Start from "./views/Start";

function App() {
  const appContext = useContext(AppContext);
  const addresses = appContext.settings.addresses;

  return addresses.length === 0 ? <Start /> : <Library />;
}

export default App;
