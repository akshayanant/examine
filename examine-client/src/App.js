import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import Container from "./components/Container";
import UserContainer from "./user_ui/components/UserContainer";
import Axios from "axios";

Axios.defaults.baseURL =
  "https://us-central1-examine-c152f.cloudfunctions.net/api";

function App() {
  return (
    <Provider store={store}>
      <UserContainer />
    </Provider>
  );
}

export default App;
