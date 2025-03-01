import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import { AnimatePresence } from "framer-motion";
import TopBarProgress from "react-topbar-progress-indicator";
import { useEffect, useState } from "react";
import { toastFail } from "./context/toast";
import { toast } from "react-toastify";
import api from "./service/api";

TopBarProgress.config({
  barColors: {
    0: "#f00",
    "1.0": "#0f0",
  },
  shadowBlur: 5,
});

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleLoading();
  }, [loading]);

  const handleLoading = async () => {
    try {
      console.log("loading");
      toast.info("Carregando...", {
        progress: undefined,
        autoClose: false,
        closeButton: false,
        toastId: "loadingToast",
        theme: "colored",
      });
      const response = await api.get("/");

      setTimeout(() => {
        if (response.data.success) {
          setLoading(response.data.success);
          toast.dismiss();
        } else {
          handleLoading();
        }
      }, 6000);

      if (loading) {
        toast.dismiss("loadingToast");
        clearTimeout;
      }
    } catch (error: any) {
      toastFail(error.message, 3000);
    }
  };

  return (
    <>
      {!loading && (
        <>
          <TopBarProgress />
          <div className="fixed top-0 left-0 z-50 w-full h-full bg-black opacity-50" />
        </>
      )}
      <AnimatePresence mode="wait">
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </>
      </AnimatePresence>
    </>
  );
}

export default App;
