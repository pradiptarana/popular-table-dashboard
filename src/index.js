import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import Routes from "./routes";
import "./App.css";

// Sync mobx storeswith browser history
import { Provider } from "mobx-react";
import browserHistory from "react-router/lib/browserHistory";
import { RouterStore, syncHistoryWithStore } from "mobx-react-router";
// import './assets/css/style.css'

// Create routing store
const routingStore = new RouterStore();

// Assign routingStore to store object
Object.assign({
  routing: routingStore
});

// Sync browser history with stores
const history = syncHistoryWithStore(browserHistory, routingStore);

// Render Routing and wrap it with mobx provider

ReactDOM.render(
  <Provider>
    <Routes history={history} />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
