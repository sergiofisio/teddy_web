import Clientes from "@/components/clientes";
import NavBar from "@/components/nav";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Sidebar from "./../../components/sidebar/index";
import Produtos from "./../../components/produtos/index";
import ClientesSelecionado from "@/components/clientesSelecionado";

export default function Login() {
  const [sidebar, setSidebar] = useState(false);
  const [selection, setSelection] = useState("Clientes");

  const handleCloseSidebar = (e: any) => {
    if (e.target.closest(".sidebar")) return;
    setSidebar(false);
  };

  console.log({ selection });

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="!flex !flex-col !h-full w-full"
    >
      <AnimatePresence>
        {sidebar && (
          <Sidebar
            selection={selection}
            setIsOpen={setSidebar}
            setSelection={setSelection}
          />
        )}
      </AnimatePresence>
      <NavBar
        selection={selection}
        setSelection={setSelection}
        setSidebar={setSidebar}
      />
      {selection === "Clientes" ? (
        <Clientes handleCloseSidebar={handleCloseSidebar} />
      ) : selection === "produtos" ? (
        <Produtos handleCloseSidebar={handleCloseSidebar} />
      ) : selection === "Clientes selecionados" ? (
        <ClientesSelecionado handleCloseSidebar={handleCloseSidebar} />
      ) : null}
    </motion.main>
  );
}
