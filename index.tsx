import * as React from "react";
import * as ReactDOM from "react-dom";
// import { render } from 'react-dom';
import { Provider } from "react-redux";
import App from "./src/components/App";

import configureStore from "./src/store/configureStore";

import "./i18n";

const store = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
