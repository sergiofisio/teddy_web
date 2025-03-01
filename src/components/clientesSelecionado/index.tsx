import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CustomSelect from "../customSelect";
import Card from "../card";
import Pagination from "../pagination";
import { cliente } from "./../../interface/interface";
import ButtonComponent from "../button";

export default function ClientesSelecionado({
  handleCloseSidebar,
}: {
  handleCloseSidebar: any;
}) {
  const [clientesSelecionados, setClientesSelecionados] = useState<cliente[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage, setClientsPerPage] = useState(16);

  const totalPages = Math.ceil(clientesSelecionados.length / clientsPerPage);
  const startIndex = (currentPage - 1) * clientsPerPage;
  const endIndex = startIndex + clientsPerPage;
  const clientesExibidos = clientesSelecionados.slice(startIndex, endIndex);

  const handleDeleteClientes = async () => {
    localStorage.setItem("clientesSelecionados", "[]");
    renderClientes();
  };

  const handleRemoveCliente = (cliente: cliente) => {
    const clientesSelecionados = JSON.parse(
      localStorage.getItem("clientesSelecionados") || "[]"
    );
    const clientesFiltrados = clientesSelecionados.filter(
      (c: cliente) => c.id !== cliente.id
    );
    localStorage.setItem(
      "clientesSelecionados",
      JSON.stringify(clientesFiltrados)
    );

    renderClientes();
  };

  useEffect(() => {
    renderClientes();
  }, []);

  function renderClientes() {
    setClientesSelecionados(
      JSON.parse(localStorage.getItem("clientesSelecionados") || "[]")
    );
  }

  console.log({ clientesSelecionados });

  return (
    <Box
      onClick={handleCloseSidebar}
      className="h-full w-full flex flex-col !p-10"
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="xl">
          <strong>{clientesSelecionados.length}</strong> clientes encontrados:
        </Text>
        <Flex align="center">
          <Text mr={2}>Clientes por página:</Text>
          <CustomSelect
            options={[8, 16, 24, 32]}
            value={clientsPerPage}
            onChange={(value) => setClientsPerPage(value)}
          />
        </Flex>
      </Flex>

      <Grid
        templateColumns="repeat(auto-fill, minmax(280px, 1fr))"
        gap={4}
        justifyContent="center"
      >
        {clientesExibidos.map((cliente: cliente, key: number) => {
          return (
            <Card
              key={key}
              cliente={cliente}
              type="selecionado"
              handleRemoveCliente={handleRemoveCliente}
            />
          );
        })}
      </Grid>

      <Flex justify="center" mt={6}>
        <ButtonComponent
          text="Limpar clientes selecionados"
          className="w-full h-10 !bg-transparent !text-orange !border-2 !border-orange hover:!bg-orange hover:!text-white transition-all duration-300 ease-in-out"
          type="button"
          loading={false}
          action={() => handleDeleteClientes()}
        />
      </Flex>

      {clientesSelecionados.length > clientsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </Box>
  );
}
