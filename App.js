import * as React from "react";
import Main from "./main";
import { Provider } from "react-redux";
import store from "./store";
// import axios from "axios";

// axios.defaults.baseURL = "http://localhost:5000";

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
export default App;
