import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { AllRouter } from "./components/routers/router";
import { store } from "./components/redux/Store/Configure";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AllRouter></AllRouter>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
