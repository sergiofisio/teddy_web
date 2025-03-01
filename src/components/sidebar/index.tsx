import { motion } from "framer-motion";
import home from "../../assets/icon/home.svg";
import cliente from "../../assets/icon/cliente.svg";
import clienteUnselected from "../../assets/icon/cliente-unselected.svg";
import produto from "../../assets/icon/produtos.svg";
import produtoUnselected from "../../assets/icon/produtos-unselected.svg";
import logo from "../../assets/Logo.svg";
import close from "../../assets/icon/colapse.svg";

const itens = [
  {
    name: "Home",
    link: "/",
    icon: { selected: home, unselected: home },
  },
  {
    name: "Clientes",
    link: "/clientes",
    icon: { selected: cliente, unselected: clienteUnselected },
  },
  {
    name: "Produtos",
    link: "/produtos",
    icon: { selected: produto, unselected: produtoUnselected },
  },
];
export default function Sidebar({
  selection,
  setIsOpen,
  setSelection,
}: {
  selection: string;
  setIsOpen: any;
  setSelection: any;
}) {
  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-60 h-full bg-white z-50 shadow-lg"
    >
      <div className="relative h-20 flex items-center justify-center !bg-black sidebar">
        <img src={logo} alt="logo" />
        <button
          className="absolute -bottom-5 -right-3 !bg-black rounded-full !border-8 !border-black cursor-pointer"
          onClick={() => setIsOpen("")}
        >
          <img src={close} alt="close" />
        </button>
      </div>
      <div>
        {itens.map(
          (
            item: {
              name: string;
              link: string;
              icon: { selected: string; unselected: string };
            },
            key: number
          ) => {
            const isSelected = item.name === selection;
            return (
              <div
                onClick={() => setSelection(item.name)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                  isSelected ? "text-[#EC6724]" : "text-[#141414]"
                } hover:bg-gray-100`}
                key={key}
              >
                <img
                  className={`w-6 h-6`}
                  src={isSelected ? item.icon.selected : item.icon.unselected}
                  alt={`icone ${item.name}`}
                />{" "}
                <h1 className="text-lg font-medium">{item.name}</h1>
              </div>
            );
          }
        )}
      </div>
    </motion.div>
  );
}
