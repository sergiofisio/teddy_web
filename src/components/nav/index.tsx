import { Flex } from "@chakra-ui/react";
import logo from "../../assets/Logo.svg";
import menu from "../../assets/icon/menu.svg";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    name: "Clientes",
  },
  {
    name: "Clientes selecionados",
  },
  {
    name: "Sair",
  },
];

export default function NavBar({
  selection,
  setSelection,
  setSidebar,
}: {
  selection: string;
  setSelection: any;
  setSidebar: any;
}) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("nome");
    navigate("/login");
  }

  return (
    <Flex
      className="!bg-white min-h-16 !flex !items-center !justify-between !px-4 !shadow-md"
      justify="space-between"
      align="center"
    >
      <div className="flex gap-4">
        <img
          className="cursor-pointer"
          src={menu}
          alt="sidebar"
          onClick={() => setSidebar(true)}
        />
        <img src={logo} alt="logo" />
      </div>
      <Flex className="!max-w-full flex justify-center" gap={4}>
        {menuItems.map(({ name }, key) => {
          const isSelected = selection === name;
          return (
            <div key={key}>
              <h1
                className={`cursor-pointer hover:text-orange ${
                  isSelected ? "text-orange" : "text-black"
                }`}
                onClick={() => {
                  name !== "Sair" ? setSelection(name) : handleLogout();
                }}
              >
                {name}
              </h1>
            </div>
          );
        })}
      </Flex>
      <h1 className="min-w-fit">
        Ola, <strong>{localStorage.getItem("nome")}</strong>
      </h1>
    </Flex>
  );
}
