import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { faIR } from "@material-ui/core/locale";
import "../Styles/Layout.scss";
import store from "../Reducers/CombineReducer.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";
const App = (props) => {
  const theme = createMuiTheme(
    {
      direction: "rtl", // Both here and <body dir="rtl">
    },
    faIR
  );
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
};
export default App;
