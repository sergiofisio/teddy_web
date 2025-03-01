import { Box, Text } from "@chakra-ui/react";
import add from "../../assets/icon/add.svg";
import edit from "../../assets/icon/edit.svg";
import trash from "../../assets/icon/trash.svg";
import minus from "../../assets/icon/minus.svg";
import { toastFail } from "@/context/toast";
import { cliente } from "./../../interface/interface";

export default function Card({
  setModal,
  cliente,
  type,
  handleRemoveCliente,
}: {
  setModal?: any;
  cliente: cliente;
  type?: string;
  handleRemoveCliente?: any;
}) {
  const handleSelect = (clienteSelecionado: cliente) => {
    const clientesSelecionados = JSON.parse(
      localStorage.getItem("clientesSelecionados") || "[]"
    );
    try {
      const findCliente = clientesSelecionados.find(
        (c: cliente) => c.id === clienteSelecionado.id
      );
      console.log({ findCliente, id: cliente.id });

      if (findCliente) {
        throw new Error("Cliente já selecionado");
      }
      clientesSelecionados.push(clienteSelecionado);
      localStorage.setItem(
        "clientesSelecionados",
        JSON.stringify(clientesSelecionados)
      );
    } catch (error: any) {
      toastFail(error.message, 3000);
    }
  };

  return (
    <Box
      className="max-w-80 h-40 flex flex-col justify-between p-4"
      p={4}
      border="1px solid #ddd"
      borderRadius="md"
      boxShadow="md"
    >
      <Text className="text-center" fontWeight="bold">
        {cliente.nome}
      </Text>
      <Text className="text-center">
        Salário:{" "}
        {Number(cliente.salario).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </Text>

      <Text className="text-center">
        Empresa:{" "}
        {cliente.empresas?.[0]?.valor
          ? Number(cliente.empresas[0].valor).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          : "N/A"}
      </Text>

      <div
        className={`!flex ${
          type === "selecionado" ? "!justify-end" : "!justify-between"
        }`}
      >
        {type !== "selecionado" && (
          <>
            <img
              className="cursor-pointer"
              src={add}
              alt="Selelcionar cliente"
              onClick={() => handleSelect(cliente)}
            />
            <img
              className="cursor-pointer"
              onClick={() => setModal({ type: "editar", id: cliente.id })}
              src={edit}
              alt="Editar Cliente"
            />
          </>
        )}
        <img
          className="cursor-pointer"
          onClick={() => {
            type === "selecionado"
              ? handleRemoveCliente(cliente)
              : setModal({ type: "delete", cliente });
          }}
          src={type === "selecionado" ? minus : trash}
          alt="Remover Cliente"
        />
      </div>
    </Box>
  );
}
