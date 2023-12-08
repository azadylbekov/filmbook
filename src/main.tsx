import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/main.scss";
import { Provider } from "react-redux";
import store from "@/store/store";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <SkeletonTheme baseColor="#232323" highlightColor="#333333">
      <Provider store={store}>
        <App />
      </Provider>
  </SkeletonTheme>
);
