import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AppAuthContextProvider } from "./context/app-auth-context";
import store from "./redux/Store";

ReactDOM.render(
  <AppAuthContextProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </AppAuthContextProvider>,
  document.getElementById("root")
);
