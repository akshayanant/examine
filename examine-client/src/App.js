import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import Container from "./components/Container";

function App() {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  );
}

export default App;
