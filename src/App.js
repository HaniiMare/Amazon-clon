import React, { useContext, useEffect } from "react";
import Landing from "./pages/Landing/Landing";
import './App.css';
import Routing from './Router';
import { DataContext } from './Component/DataProvider/DataProvider';
import { Type } from "./Utility/action.type"
import { auth } from "./Utility/firebase";

function App() {

const [{user}, dispatch] = useContext(DataContext);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, [user]);
  return (
    <div>
      <Routing />
    </div>
  );
}

export default App;
