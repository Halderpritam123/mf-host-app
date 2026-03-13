import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";

// Minimal Redux-compatible store fallback for when remotes are unavailable
function createFallbackStore() {
  let state = {};
  const listeners = [];
  return {
    getState: () => state,
    dispatch: (action) => action,
    subscribe: (listener) => {
      listeners.push(listener);
      return () => listeners.splice(listeners.indexOf(listener), 1);
    },
    replaceReducer: () => {},
  };
}

async function mount() {
  let store;
  try {
    const remoteStore = await import("remoteButton/store");
    store = remoteStore.default || remoteStore;
  } catch {
    store = createFallbackStore();
  }

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

mount();
