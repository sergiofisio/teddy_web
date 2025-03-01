import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "./components/ui/provider.tsx";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider>
      <App />
      <ToastContainer />
    </Provider>
  </BrowserRouter>
);
