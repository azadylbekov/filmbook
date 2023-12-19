import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { SkeletonTheme } from "react-loading-skeleton";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.tsx";
import { StrictMode } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/main.scss";
import "react-loading-skeleton/dist/skeleton.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SkeletonTheme baseColor="#232323" highlightColor="#333333">
    <Provider store={store}>
      <ErrorBoundary>
        <StrictMode>
          <App />
        </StrictMode>
      </ErrorBoundary>
    </Provider>
  </SkeletonTheme>
);
