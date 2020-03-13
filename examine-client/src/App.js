import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

import home from "./pages/home";
import signin from "./pages/signin";
import Navbar from "./components/navbar";
import exams from "./pages/exams";
import questions from "./pages/questions";
import addQuestion from "./pages/addQuestion";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#0066ff",
      main: "#388e3c",
      // dark: will be calculated from palette.primary.main,

      contrastText: "#fff"
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#fff"
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  }
});
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Navbar></Navbar>
        <div className="container">
          <Switch>
            <Route exact path="/" component={home} />
            <Route exact path="/signin" component={signin} />
            <Route exact path="/exams" component={exams} />
            <Route exact path="/questions" component={questions} />
            <Route exact path="/addquestion" component={addQuestion} />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
